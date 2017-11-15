const router = require('express').Router()
const { Activity } = require('../db/models')
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.json(await Activity.findAll({ include: [User] }));
  }
  catch (err) { next(err) }
});

router.get('/:id', async (req, res, next) => {
  try {
    console.log('ID: ', req.params.id);
    res.json(await Activity.findOne(
      {
        where: { id: req.params.id },
        include:
        [User]
      }
    ));
  }
  catch (err) { next(err) }
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
