const {
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
  mapGpxArrayToPointsArray,
  formatGpxForDatabase,
} = require('./gpxConvert');
const {
  getStartTime,
  getEndTime,
  getDuration,
  msToTimestamp
} = require('./gpxMetadata');
const gpxFilter = require('./gpxFilter');

module.exports = {
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
  mapGpxArrayToPointsArray,
  formatGpxForDatabase,
  getStartTime,
  getEndTime,
  getDuration,
  msToTimestamp,
  gpxFilter,
};
