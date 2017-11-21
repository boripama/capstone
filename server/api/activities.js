const router = require('express').Router();
<<<<<<< HEAD
const { Activity, Like } = require('../db/models');
const { User } = require('../db/models');
=======
const { Activity, User, Comment } = require('../db/models');
>>>>>>> master
const { isUser, isAdmin } = require('../middleware/auth');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Activity.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: User, as: 'likes' }]
    })
    );
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: User, as: 'likes' }
      ]
    });
    res.json(activity);
  }
  catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    let activity = await Activity.create(req.body.activity);
    activity.setUser(req.body.userId);
    res.status(201).json(activity);
  }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Activity.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});

<<<<<<< HEAD
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
=======
// COMMENTS ROUTES

router.get('/:id/comments', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, { include: [User] });
    const comments = await activity.getComments({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(comments);
>>>>>>> master
  }
  catch (err) { next(err); }
});

<<<<<<< HEAD
router.delete('/:id/like', async (req, res, next) => {
  try {
    await Like.destroy({ where: { activityId: req.params.id, userId: req.user.id } });
    res.sendStatus(204);
  }
  catch (err) { next(err); }
});

=======
router.post('/:id/comments', async (req, res, next) => {
  try {
    req.body.activityId = req.params.id;
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  }
  catch (err) { next(err); }
});
>>>>>>> master
