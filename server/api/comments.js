const router = require('express').Router();
const { Activity, User, Comment } = require('../db/models');
const { isUser, isAdmin, canEditComment } = require('../middleware/auth');
module.exports = router;

router.param('id', async (req, res, next, commentId) => {
  try {
    req.comment = await Comment.findById(commentId);
    req.activity = await Activity.findById(req.comment.activityId);
  }
  catch (err) { next(err); }
});

router.get('/', isAdmin, async (req, res, next) => {
  try {
    res.json(await Comment.findAll({ include: [User] }));
  }
  catch (err) { next(err); }
});

router.get('/:id', isUser, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(comment);
  }
  catch (err) { next(err); }
});

router.put('/:id', canEditComment, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const newComment = comment.update(req.body);
    res.status(202).json(newComment);
  }
  catch (err) { next(err); }
});

router.delete('/:id', canEditComment, async (req, res, next) => {
  try {
    const id = req.params.id;
    await Comment.destroy({ where: { id } });
  }
  catch (err) { next(err); }

  res.sendStatus(204);
});
