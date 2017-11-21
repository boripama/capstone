const router = require('express').Router();
const { Followers} = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');


module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const followers = await Followers.findAll({});
    res.json(followers);
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const followers = await Followers.findAll({where: { userId: +req.params.id}});
    res.json(followers);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const follower = await Followers.create(req.body);
    res.json(follower);
  }
  catch (err) { next(err); }
});
