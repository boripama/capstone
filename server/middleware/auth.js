const { User } = require('../db/models');

module.exports = {
  isAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();

    const err = new Error('User is Not Authorized');
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
};
