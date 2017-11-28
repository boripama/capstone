const router = require('express').Router();
const { Rec, User } = require('../db/models');
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
    console.log('---------get route hit---------', req.params.id);
    const user = await User.findById(req.params.id);
    const recs = await user.getRecs({attributes: {exclude: ['password', 'salt', 'googleId', 'isAdmin']}});
    res.json(recs.filter(rec => (rec.rec.status === 'pending')));
  }
  catch (err) { next(err); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const rec = await Rec.find({where: {status: 'pending', userId: req.params.id, recId: req.body.recId}});
    const updated = await rec.update({status: req.body.status});
    res.json(updated);
  }
  catch (err) { next(err); }
});

