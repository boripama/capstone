const Sequelize = require('sequelize')
const db = require('../db')

const Activity = db.define('activity', {
  name: { type: Sequelize.STRING },
  polyline: { type: Sequelize.TEXT },
})

module.exports = Activity

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
