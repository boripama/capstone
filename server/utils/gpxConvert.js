const gps = require('gps-util');
const { gpxParse } = gps;
const polyline = require('@mapbox/polyline');
const { getStartTime, getEndTime, getDuration } = require('./gpxMetadata');

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

const formatGpxForDatabase = async gpxFile => {
  const gpxArray = await convertGpxToArray(gpxFile);
  const startTime = getStartTime(gpxArray);
  const endTime = getEndTime(gpxArray);

  const pointsArray = await mapGpxArrayToPointsArray(gpxArray);
  const newPolyline = convertPointsToPolyline(pointsArray);

  return { startTime, endTime, polyline: newPolyline };
};

module.exports = {
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
  mapGpxArrayToPointsArray,
  formatGpxForDatabase,
};
