const router = require('express').Router();
const { Activity, User, Comment } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');
module.exports = router;

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

router.put('/:id', async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    const newComment = comment.update(req.body);
    res.status(202).json(newComment);
  }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Comment.destroy({ where: { id } }); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
