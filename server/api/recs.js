const router = require('express').Router();
const { Rec } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');


module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const recs = await Rec.findAll();
    res.json(recs);
  }
  catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = +req.params.id;
    const recs = await Rec.findAll({ where: { userId: id } });
    res.json(recs);
  }
  catch (err) { next(err); }
});

