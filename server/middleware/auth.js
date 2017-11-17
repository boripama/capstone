const { User } = require('../db/models') 

module.exports = {
  isAdmin: (req, res, next) => {
    console.log('ran is Admin');
    if (req.user && req.user.isAdmin) return next();

    const err = new Error("User is Not Autorized");
    err.satus = 401;
    next(err);
  },

  isUser: (req, res, next) => {
    console.log('ran is User');
    User.findById(req.user.id)
      .then(() => {
        next();
      })
      .catch((err) => {
        next(err);
      });
  },
};
