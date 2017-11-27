const router = require('express').Router();
const { Rec, User } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const recs = await Rec.findAll();
    res.json(recs);
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const recs = await user.getRecs({attributes: {exclude: ['password', 'salt', 'googleId', 'isAdmin']}});
    res.json(recs);
  }
  catch (err) { next(err); }
});

