const router = require('express').Router();
const { Activity, Like } = require('../db/models');
const { User } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const activities = await Activity.findAll({ include: [User, { model: User, as: 'likes' }] });
    // activities.map(async activity => {
    //   const likes = await activity.getLikes();
    //   console.log('LIKES!!! ', likes);
    //   activity.likes = likes;
    // });
    // activities.forEach( async activity => {
    //   await activity.getLikes();
    // });
    res.json(activities);
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, { include: [User, { model: User, as: 'likes' }] });
    // activity.dataValues.likes = await activity.getLikes();
    // console.log('activity.likes ', activity);
    res.json(activity);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    let activity = await Activity.create(req.body.activity);
    activity.setUser(req.body.userId);
    res.json(activity);
  }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Activity.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});

//likes
router.get('/:id/likes', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id);
    const likes = await activity.getLikes();
    res.json(likes);
  }
  catch (err) { next(err); }
});

router.post('/:id/like', async (req, res, next) => {
  try {
    res.json(await Like.create({ activityId: req.params.id, userId: req.user.id }));
  }
  catch (err) { next(err); }
});

router.delete('/:id/like', async (req, res, next) => {
  try {
    await Like.destroy({ where: { activityId: req.params.id, userId: req.user.id } });
    res.sendStatus(204);
  }
  catch (err) { next(err); }
});

