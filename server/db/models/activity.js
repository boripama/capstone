const Sequelize = require('sequelize');
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
    get () {
      return msToTimestamp(this.getDataValue('durationMs'));
    }
  }
});

/**
 * instanceMethods
 */
Activity.prototype.decodePoly = function() {
  return convertPolylineToPoints(this.polyline);
};

Activity.prototype.setCenter = function(pointsArray) {
  const lng = pointsArray.reduce((total, point) => total + point[0], 0) / pointsArray.length;
  const lat = pointsArray.reduce((total, point) => total + point[1], 0) / pointsArray.length;

  this.centerLng = lng;
  this.centerLat = lat;
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

  const points = activity.decodePoly(activity.polyline);
  const lng = points.reduce((tot, p) => tot + p[0], 0) / points.length;
  const lat = points.reduce((tot, p) => tot + p[1], 0) / points.length;
  activity.center = [lng, lat];
});

// updates user totals after activity is updated
Activity.afterUpdate(async (activity, options) => {
  const user = await User.findById(activity.userId);
  user.updateTotals(activity);
});

module.exports = Activity;

