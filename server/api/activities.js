const router = require('express').Router()
const { Activity } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    await res.json(Activity.findAll());
  }
  catch (err) => { }
    .then(activities => res.json(activities))
    .catch(next)
})
