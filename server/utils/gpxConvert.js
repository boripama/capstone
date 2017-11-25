const gps = require('gps-util');
const { gpxParse } = gps;
const polyline = require('@mapbox/polyline');
const { getStartTime, getEndTime, getDuration } = require('./gpxMetadata');

// https://scotch.io/tutorials/express-file-uploads-with-multer
const gpxFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.gpx$/)) {
    return cb(new Error('Only gpx files are allowed'), false);
  }
  cb(null, true);
};

const convertGpxToArray = gpxFile => {
  return new Promise((res, rej) => {
    gpxParse(gpxFile, (err, result) => {
      if (err) rej(err);
      res(result);
    });
  });
};

const mapGpxArrayToPointsArray = gpxArray => gpxArray.map(p => [p.lng, p.lat]);

const convertPointsToPolyline = pointsArray => {
  return polyline.encode(pointsArray);
};

const convertPolylineToPoints = poly => {
  return polyline.decode(poly);
};

const formatGpxForDatabase = async (gpxFile, title = 'New Activity') => {
  try {
    const gpxArray = await convertGpxToArray(gpxFile);
    const startTime = getStartTime(gpxArray);
    const endTime = getEndTime(gpxArray);

    const pointsArray = await mapGpxArrayToPointsArray(gpxArray);
    const newPolyline = convertPointsToPolyline(pointsArray);

    return { title, startTime, endTime, polyline: newPolyline };
  }
  catch (err) { throw new Error(err); }
};

module.exports = {
  gpxFilter,
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
  mapGpxArrayToPointsArray,
  formatGpxForDatabase,
};
