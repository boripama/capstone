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

