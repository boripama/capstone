const router = require('express').Router();
const multer = require('multer');
const { User, Activity, Like, Follower, Comment } = require('../db/models');
const { isUser, isAdmin, isAdminOrLoggedInUser, canRemoveFollower } = require('../middleware/auth');
const { gpxFilter, formatGpxForDatabase } = require('../utils');
const { updateCacheAndSuggestions } = require('../utils/reco');

module.exports = router;

router.get('/', isUser, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: { exclude: ['password', 'salt', 'googleId'] }
  })
    .then(users => res.json(users))
    .catch(next);
});

router.get('/:id', isUser, (req, res, next) => {
  User.findById(req.params.id, { attributes: { exclude: ['password', 'salt', 'googleId'] } })
    .then(user => res.json(user))
    .catch(next);
});

router.put('/:id', isAdminOrLoggedInUser, async (req, res, next) => {
  const id = +req.params.id;
  const user = await User.findById(id);
  const result = await user.update(req.body);
  res.status(202).json(result);
});

// ACTIVITIES ROUTES
router.get('/:id/activities', isUser, async (req, res, next) => {
  const activities = await Activity.findAll({
    where: { userId: req.params.id }, include: [
      { model: Comment },
      { model: User, attributes: ['id', 'name', 'email'] },
      { model: User, as: 'likes' }
    ]
  });
  res.status(200).json(activities);
});

router.get('/:id/likes', isUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const activities = await user.getLikes();
    res.json(activities);
  }
  catch (err) { next(err); }
});

// multer config for POST route below
const storage = multer.memoryStorage();
const upload = multer({ storage, fileFilter: gpxFilter });

router.post('/:id/activities', isAdminOrLoggedInUser, upload.single('gpx'), async (req, res, next) => {
  if (req.fileValidationError) { res.end(req.fileValidationError); }

  const userId = req.params.id;
  const file = req.file.buffer;

  const activityInfo = await formatGpxForDatabase(file);
  activityInfo.title = req.body.title;

  const newActivity = await Activity.create(activityInfo);

  newActivity.setUser(userId);

  updateCacheAndSuggestions(userId);
  res.status(201).json(newActivity);
});

// COMMENTS ROUTES
router.get('/:id/comments', isUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const comments = await user.getComments({ include: Activity });
    res.json(comments);
  }
  catch (err) { next(err); }
});

//FOLLOWERS ROUTES
router.delete('/:userId/followers/:followerId', canRemoveFollower, async (req, res, next) => {
  try {
    await Follower.destroy({ where: { userId: req.params.userId, followerId: req.params.followerId } });
    const user = await User.findById(req.params.userId);
    await user.update({ totalFollowers: user.totalFollowers - 1 });
    res.sendStatus(204);
  }
  catch (err) { console.log('Removing follower unsucessful', err); }
});
