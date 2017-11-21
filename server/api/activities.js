const router = require('express').Router();
const { Activity, User, Comment } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Activity.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    }));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
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

// COMMENTS ROUTES

router.get('/:id/comments', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, { include: [User] });
    const comments = await activity.getComments({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(comments);
  }
  catch (err) { next(err); }
});

router.post('/:id/comments', async (req, res, next) => {
  try {
    req.body.activityId = req.params.id;
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  }
  catch (err) { next(err); }
});
