const router = require('express').Router();
const { Follower, User } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');


module.exports = router;

router.get('/', isUser, async (req, res, next) => {
  try {
    const followers = await Follower.findAll();
    res.json(followers);
  }
  catch (err) { next(err); }
});

router.get('/:id', isUser, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const user = await User.findById(id);
    const followers = await user.getFollowees();
    res.json(followers);
  }
  catch (err) { next(err); }
});

router.post('/', isUser, async (req, res, next) => {
  try {
    const followerJoin = await Follower.create(req.body);
    const follower = await User.findById(followerJoin.followerId);
    const user = await User.findById(followerJoin.followeeId);
    await user.update({totalFollowers: user.totalFollowers + 1});
    res.status(202).json(follower);
  }
  catch (err) { next(err); }
});

router.put('/:id', isUser, async (req, res, next) => {
  try {
    const follower = await Follower.find({
      where: { userId: req.params.id, followerId: req.body.followerId }
    });
    const updated = await follower.update(req.body);
    res.status(201).json(updated);
  }
  catch (err) { next(err); }
});
