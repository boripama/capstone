const router = require('express').Router();
const multer = require('multer');
const { User, Activity } = require('../db/models');
const {
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
  gpxFilter,
} = require('../utils');


module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
  .then(users => res.json(users))
  .catch(next);
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/:id/activities', async (req, res, next) => {
  const userId = +req.params.id;
  console.log('userId', userId, typeof userId);
  const activities = await Activity.findAll({where: {userId: userId}});
  console.log('act', activities);
  res.status(200).json(activities);
});

router.post('/:id/activities', upload.single('gpx'), async (req, res, next) => {
  const userId = req.params.id;
  const file = req.file.buffer;

  console.log(req.file);
  const pointsArray = await convertGpxToArray(file);
  const newPolyline = convertPointsToPolyline(pointsArray);

  const newActivity = await Activity.create({ polyline: newPolyline });

  newActivity.setUser(userId);

  res.status(202).json(newActivity);
});
