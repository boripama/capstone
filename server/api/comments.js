const router = require('express').Router();
const { Activity, User, Comment } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');
module.exports = router;


router.param('id', (req, res, next, commentId) => {
  Comment.findById(commentId)
  .then(comment => {
    req.entity = comment;
    return Activity.findById(comment.activityId)
  })
  .then(activity => {
    req.activity = activity;
  })
  .catch(next)
})

const canEditComment = (req, res, next) => {
  // User owns comment
  if (req.user && +req.comment.userId === +req.user.id) {
    return next()
  }

  // User owns activity
  if (req.user && +req.activity.userId == +req.user.id) {
    return next()
  }

  if (req.user.isAdmin) {
    return next()
  }

  let err = new Error("nope")
  err.status = 401
  return next(err)
}



/** 🐍🐍
 * On the get route below we have an isAdmin function so only an admin can hit
 * that route. Some of the routes, like a put or delete for a specific comment
 * should allow three people access: an admin, the comment owner or the activity
 * owner. What would be the best way to go about doing that?
 */

router.get('/', isAdmin, async (req, res, next) => {
  try {
    res.json(await Comment.findAll({ include: [User] }));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id, {
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(comment);
  }
  catch (err) { next(err); }
});

router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const newComment = comment.update(req.body);
    res.status(202).json(newComment);
  }
  catch (err) { next(err); }
});

router.put('/users/:userId/comments/:commentId')

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Comment.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
