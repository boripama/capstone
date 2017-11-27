const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../db');
const { sToTimestamp } = require('../../utils');
const { findAndUpdateCache } = require('../../utils/reco');

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  totalDistance: {
    type: Sequelize.FLOAT,
    defaultValue: 0
  },
  totalTime: { // stored as seconds
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  zip: {
    type: Sequelize.INTEGER,
    validate: {
      isZip(value) {
        if ((value + '').length !== 5) {
          throw new Error('Zip must be 5 digits');
        }
      }
    }
  },
  name: {
    type: Sequelize.STRING,
    defaultValue: null
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.placecage.com/500/500',
  },
  aboutMe: {
    type: Sequelize.TEXT,
    defaultValue: null
  },
  totalTimeTimestamp: { // readable timestamp for display purposes
    type: Sequelize.VIRTUAL,
    get() {
      return sToTimestamp(this.getDataValue('totalTime'));
    }
  }
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password;
};

User.prototype.updateTotals = async function (activity) {
  const cache = await findAndUpdateCache(this.id);
  this.setDataValue('totalDistance', this.totalDistance + activity.distance);
  this.setDataValue('totalTime', this.totalTime + activity.duration);
  return this.save();
};

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex');
};

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);
