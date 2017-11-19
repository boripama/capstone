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

/**
 * classMethods
 */

/**
 * hooks
 */
Activity.beforeSave((activity, options) => {
  const start = activity.startTime;
  const end = activity.endTime;
  activity.durationMs = getDuration(end, start);
});

Activity.afterUpdate(async (activity, options) => {
  const user = await User.findById(activity.userId);
  user.updateTotals(activity);
});

module.exports = Activity;

