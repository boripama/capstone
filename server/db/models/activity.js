const Sequelize = require('sequelize');
const db = require('../db');

const Activity = db.define('activity', {
  title: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  length: {
    type: Sequelize.FLOAT
  },
  route: {
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

