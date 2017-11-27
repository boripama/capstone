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

/** 🐍🐍
 * I'd like to use the cache that's set up below (which isn't being used currently)
 * in a different way: to cache every comparison we've made between two activities
 * i.e. the table would look like "act1 | act2 | match (t/f)"
 *
 * What I'd like to know are a couple things:
 * 1. How to best set up this relationship with Sequelize/Postgres
 * 2. How to best query for matches when we're doing comparisons. This seems
 *    straightforward enough, but I want to avoid a situation where we have rows
 *    of both "34 | 56 | true" and "56 | 34 | true" if that makes sense.
 *
 * It seems reasonable (to me) that we should be storing the results of those comparisons,
 * as a database lookup would definitely be quicker than the comparison function
 * when it runs every test.
 */

const ActivityCache = db.define('activity-cache');

Activity.belongsToMany(User, { through: 'activity-cache' });
User.belongsToMany(Activity, { through: 'activity-cache' });

const Rec = db.define('rec');
User.belongsToMany(User, {as: 'recs', through: 'rec'});

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
  Rec,
};
