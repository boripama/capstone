const router = require('express').Router();
const multer = require('multer');
const { User, Activity, Like } = require('../db/models');
const { isUser, isAdmin } = require('../middleware/auth');
const { gpxFilter, formatGpxForDatabase } = require('../utils');

module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: { exclude: ['password', 'salt', 'googleId'] }
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, { attributes: { exclude: ['password', 'salt', 'googleId'] } })
    .then(user => res.json(user))
    .catch(next);
});

router.put('/:id', async (req, res, next) => {
  const id = +req.params.id;
  const user = await User.findById(id);
  const result = await user.update(req.body);
  res.status(202).json(result);
});

// ACTIVITIES ROUTES
router.get('/:id/activities', async (req, res, next) => {
  const userId = +req.params.id;
  const activities = await Activity.findAll({
    where: { userId: userId }, include: [
      { model: User, attributes: ['id', 'name', 'email'] },
      { model: User, as: 'likes' }
    ]
  });
  res.status(200).json(activities);
});

router.get('/:id/likes', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    // const likes = await Like.findAll({ where: { userId: req.params.id } });
    // const activities = await Promise.all(likes.map(like => Activity.findById(like.activityId)));
    const activities = await user.getLikes();
    res.json(activities);
  }
  catch (err) { next(err); }
});

// multer config for POST route below
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter: gpxFilter });

router.post('/:id/activities', upload.single('gpx'), async (req, res, next) => {
  if (req.fileValidationError) { res.end(req.fileValidationError); }

  const userId = req.params.id;
  const file = req.file.buffer;

  const activityInfo = await formatGpxForDatabase(file);
  activityInfo.title = req.body.title;

  const newActivity = await Activity.create(activityInfo);

  newActivity.setUser(userId);

  res.status(201).json(newActivity);
});

// COMMENTS ROUTES
router.get('/:id/comments', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const comments = await user.getComments({ include: Activity });
    res.json(comments);
  }
  catch (err) { next(err); }
});
