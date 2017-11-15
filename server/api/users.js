const router = require('express').Router();
const { User, Activity } = require('../db/models');
const {
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
} = require('../utils/gpxConvert');
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

router.post('/:id/activities', async (req, res, next) => {
  const userId = req.params.id;
  const file = req.file; //file from multer request

  const pointsArray = await convertGpxToArray(file);
  const newPolyline = await convertPointsToPolyline(pointsArray);

  const newActivity = await Activity.create({ polyline: newPolyline });
  Activity.setUser(userId);
});
