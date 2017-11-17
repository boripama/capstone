const router = require('express').Router();
const google = require('googleapis');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    console.log('ROUTE STRING: ', req.body.polyline);
    const routeCoords = await google.maps.geometry.encoding.decodePath(req.body.polyline);//google apis .map doesnt exist
    res.json(routeCoords);
  }
  catch (err) { next(err); }
});

