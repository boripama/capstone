const router = require('express').Router();
const googleapis = require('googleapis');
// const google = require('https://apis.google.com/js/api.js');
module.exports = router;

router.post('/', async (req, res, next) => {
  try {
    console.log('ROUTE STRING: ', req.body.polyline);
    // googleapis.discover('geometry', 'v1').execute(function(err, client) {
    //   // make requests here
    //   const routeCoords = google.maps.geometry.encoding.decodePath(req.body.polyline);//google apis .map doesnt exist
    //   // client.urlshortener.url.get({ shortUrl: 'http://goo.gl/DdUKX' }).execute(console.log);
    // });
    res.json(routeCoords);
  }
  catch (err) { next(err); }
});

