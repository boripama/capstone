const Sequelize = require('sequelize');
const db = require('../db');

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
  duration: {
    type: Sequelize.DATE
  }
},
{
  getterMethods: {
    duration() {
      return this.end - this.start;
    },
    pace() {
      return this.duration / this.length;
    }
  }
});

module.exports = Activity;

