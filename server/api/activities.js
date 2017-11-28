const router = require('express').Router();
const { Activity, User, Like, Comment } = require('../db/models');
const { isUser, isAdmin, isAdminOrLoggedInUser, canRemoveFollower, canAddActivity } = require('../middleware/auth');
module.exports = router;

router.get('/', isUser, async (req, res, next) => {
  try {
    res.json(await Activity.findAll({
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: User, as: 'likes' },
        { model: Comment, include: [
          { model: User, attributes: ['id', 'name', 'email', 'image']}
        ]}
      ]
    })
    );
  }
  catch (err) { next(err); }
});

router.get('/:id', isUser, async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, {
      include: [
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: User, as: 'likes' },
        { model: Comment, include: [
          { model: User, attributes: ['id', 'name', 'email', 'image'] }
        ]}
      ]
    });
    res.json(activity);
  }
  catch (err) { next(err); }
});

router.post('/', canAddActivity, async (req, res, next) => {
  try {
    let activity = await Activity.create(req.body.activity);
    activity.setUser(req.body.userId);
    res.status(201).json(activity);
  }
  catch (err) { next(err); }
});

router.delete('/:id', isAdminOrLoggedInUser, async (req, res, next) => {
  const id = req.params.id;

  try { await Activity.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});

//likes
router.get('/:id/likes', isUser, async (req, res, next) => {
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

// COMMENTS ROUTES


router.get('/:id/comments', isUser, async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, { include: [User] });
    const comments = await activity.getComments({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(comments);
  }
  catch (err) { next(err); }
});

router.post('/:id/comments', isUser, async (req, res, next) => {
  try {
    req.body.activityId = req.params.id;
    const newComment = await Comment.create(req.body); // passing in user id from front end, and attaching it to body  reqbody   userId comment content
    res.status(201).json(newComment);
  }
  catch (err) { next(err); }
});
