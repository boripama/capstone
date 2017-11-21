const db = require('../db');
const Sequelize = require('sequelize');
const User = require('./user');
const Activity = require('./activity');


/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Activity.belongsTo(User);

// define custom fields on join table
const Followers = db.define('followers', {
  status: {
    type: Sequelize.ENUM('allowed', 'ignored', 'blocked'),
    defaultValue: 'allowed',
  },
});

const Like = db.define('like', {
});

// set relationship for join table
User.belongsToMany(User, { as: 'follower', through: 'followers' });

Activity.belongsToMany(User, { as: 'likes', through: 'like' });
User.belongsToMany(Activity, { as: 'likes', through: 'like' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Activity,
  Followers,
  Like,
};
