const router = require('express').Router()
const { Activity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    await res.json(Activity.findAll());
  }
  catch (err) { next(err) }
});

router.get('/:id', async (req, res, next) => {
  try {
    await res.json(Activity.findOne(
      {
        where: { id: req.params.id }
      }
    ));
  }
  catch (err) { next(err) }
});
