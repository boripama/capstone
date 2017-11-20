const Sequelize = require('sequelize');
const turf = require('turf');
const db = require('../db');
const {
  getDuration,
  msToTimestamp,
  convertPolylineToPoints,
} = require('../../utils');
const User = require('./user');

/**
 * model definition
 */

const Activity = db.define('activity', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'New Activity',
  },
  distance: {
    type: Sequelize.FLOAT
  },
  polyline: {
    type: Sequelize.TEXT
  },
  startTime: {
    type: Sequelize.DATE
  },
  endTime: {
    type: Sequelize.DATE
  },
  durationMs: {
    type: Sequelize.INTEGER,
  },
  center: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  },
  durationTimestamp: { // readable timestamp for display purposes
    type: Sequelize.VIRTUAL,
    get() {
      return msToTimestamp(this.getDataValue('durationMs'));
    }
  },
  pace: { // needs to be formatted
    type: Sequelize.VIRTUAL,
    get() {
      return this.getDataValue('durationMs') / this.getDataValue('distance');
    }
  }
});

/**
 * instanceMethods
 */
Activity.prototype.decodePoly = function () {
  return convertPolylineToPoints(this.polyline);
};

Activity.prototype.getCenter = function () {
  const points = this.decodePoly(this.polyline);

  const center = points.reduce((t, p) => [t[0] + p[0], t[1] + p[1]], [0, 0])
    .map(e => e / points.length);

  return center;
};

// units can be 'miles', 'kilometers', 'radians' or 'degrees'
Activity.prototype.getDistance = function (units) {
  const length = turf.lineDistance(this.getGeoJSON(), units);

  return length;
};

Activity.prototype.getGeoJSON = function () {
  const points = this.decodePoly(this.polyline);

  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: points
    }
  };
};

/**
 * classMethods
 */

/**
 * hooks
 */

// set duration and center
Activity.beforeSave((activity, options) => {
  const start = activity.startTime;
  const end = activity.endTime;
  activity.durationMs = getDuration(end, start);

  activity.center = activity.getCenter();
  activity.distance = activity.getDistance('miles');
});

// updates user totals after activity is updated
Activity.afterUpdate(async (activity, options) => {
  const user = await User.findById(activity.userId);
  user.updateTotals(activity);
});

module.exports = Activity;

