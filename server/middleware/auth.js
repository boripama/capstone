const { User } = require('../db/models');

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();

    const err = new Error('User is not authorized');
    err.status = 401;
    next(err);
  },
  isUser: (req, res, next) => {
    User.findById(req.user.id)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
  isAdminOrLoggedInUser: (req, res, next) => {
    if ((+req.user.id === +req.params.id) || req.user.isAdmin) return next();

    const err = new Error('User is not authorized');
    err.status = 401;
    next(err);
  },
  canRemoveFollower: (req, res, next) => {
    if ((+req.user.id === +req.params.followerId) || req.user.isAdmin) return next();

    const err = new Error('User is not authorized');
    err.status = 401;
    next(err);
  },
  canAddActivity: (req, res, next) => {
    if ((+req.user.id === +req.body.userId) || req.user.isAdmin) return next();

    const err = new Error('User is not authorized');
    err.status = 401;
    next(err);
  },
  canEditComment: (req, res, next) => {
    // User owns comment
    if (req.user && +req.comment.userId === +req.user.id) {
      return next();
    }

    // User owns activity
    if (req.user && +req.activity.userId === +req.user.id) {
      return next();
    }

    // User is admin
    if (req.user.isAdmin) {
      return next();
    }

    const err = new Error('User is not authorized');
    err.status = 401;
    return next(err);
  }
};
