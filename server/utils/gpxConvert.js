const gps = require('gps-util');
const { gpxParse } = gps;
const polyline = require('@mapbox/polyline');
const fs = require('fs');

const convertGpxToArray = gpxFile => {
  // const data = fs.readFileSync(gpxFile);

  return new Promise((res, rej) => {
    gpxParse(gpxFile, (err, result) => {
      if (err) rej(err);
      res(result.map(point => [point.lat, point.lng]));
    });
  });
};

const convertPointsToPolyline = pointsArray => {
  return polyline.encode(pointsArray);
};

const convertPolylineToPoints = poly => {
  return polyline.decode(poly);
};

module.exports = {
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
};
