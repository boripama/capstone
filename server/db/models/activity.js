const Sequelize = require('sequelize');
const db = require('../db');
const {
  getStartTime,
  getEndTime,
  getDuration,
  msToTimestamp
} = require('../../utils');

const Activity = db.define('activity', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'New Activity',
  },
  totalDistance: {
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
  durationTimestamp: {
    type: Sequelize.VIRTUAL,
    get() {
      return msToTimestamp(this.getDataValue('durationMs'));
    }
  }
},
{
  getterMethods:
    {
      pace() {
        // return this.durationMs / this.totalDistance;
      }
    }
}
);

Activity.beforeSave((activity, options) => {
  const start = activity.startTime;
  const end = activity.endTime;
  activity.durationMs = getDuration(end, start);
});

module.exports = Activity;

