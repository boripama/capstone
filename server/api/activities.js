const router = require('express').Router()
const { Activity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    await res.json(Activity.findAll(
      {
        include:
        [{
          model: User,
          attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
        }]
      }
    ));
  }
  catch (err) { next(err) }
});

router.get('/:id', async (req, res, next) => {
  try {
    await res.json(Activity.findOne(
      {
        where: { id: req.params.id },
        include:
        [{
          model: User,
          attributes: ['id', 'email', 'firstName', 'lastName', 'admin']
        }]
      }
    ));
  }
  catch (err) { next(err) }
});

router.post('/', async (req, res, next) => {
  try {
    let activity = await Review.create(req.body.review);
    activity.setUser(req.body.userId);
    res.json(activity);
  }
  catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;

  try { await Activity.destroy({ where: { id }}); }
  catch (err) { next(err); }

  res.sendStatus(204);
});
