const router = require('express').Router();
const { Like } = require('../db/models');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    res.json(await Like.create({ activityId: req.body.activityId, userId: req.body.userId }));
  }
  catch (err) { next(err); }
});

router.delete('/', async (req, res, next) => {
  try {
    const like = await (Like.find({ where: { activityId: req.body.activityId, userId: req.body.userId } }));
    res.json(await like.destroy());
  }
  catch (err) { next(err); }
});