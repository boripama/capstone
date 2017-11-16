const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'New Activity',
  },
  length: {
    type: Sequelize.FLOAT
  },
  polyline: {
    type: Sequelize.TEXT
  },
  start: {
    type: Sequelize.DATE
  },
  end: {
    type: Sequelize.DATE
  }
});

module.exports = Activity;

