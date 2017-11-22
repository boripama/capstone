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


const Comment = db.define('comment', {
  content: Sequelize.TEXT,
});

Activity.hasMany(Comment);
User.hasMany(Comment);

Comment.belongsTo(User);
Comment.belongsTo(Activity);

// activity ownership
Activity.belongsTo(User, { through: 'activity' });

// define custom fields on join table
const Follower = db.define('follower', {
  status: {
    type: Sequelize.ENUM('allowed', 'ignored', 'blocked'),
    defaultValue: 'allowed',
  },
});

// set relationship for join table
User.belongsToMany(User, { as: 'followers', through: 'follower' });

const Like = db.define('like', {});

Activity.belongsToMany(User, { as: 'likes', through: 'like' });
User.belongsToMany(Activity, { as: 'likes', through: 'like' });

const ActivityCache = db.define('activity-cache');

Activity.belongsToMany(User, { through: 'activity-cache' });
User.belongsToMany(Activity, { through: 'activity-cache' });

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Activity,
  Like,
  Comment,
  Follower,
  ActivityCache,
};
