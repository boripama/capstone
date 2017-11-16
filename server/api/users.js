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

// configure multer to download to temp director and only accept gpx files
const upload = multer({ dest: '../temp/', fileFilter: gpxFilter });

router.post('/:id/activities', upload.any(), async (req, res, next) => {
  const userId = req.params.id;
  const file = req.file; //file from multer request, may need to be modified

  const pointsArray = await convertGpxToArray(file);
  const newPolyline = await convertPointsToPolyline(pointsArray);

  const newActivity = await Activity.create({ polyline: newPolyline });
  await Activity.setUser(userId);

  res.status(202).json(newActivity);
});
