const router = require('express').Router();
const { Activity } = require('../db/models');
const { User } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    res.json(await Activity.findAll({ include: [User] }));
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const activity = await Activity.findById(req.params.id, { include: [User] });
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

