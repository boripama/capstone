const {
  gpxFilter,
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

module.exports = {
  gpxFilter,
  convertGpxToArray,
  convertPointsToPolyline,
  convertPolylineToPoints,
  mapGpxArrayToPointsArray,
  formatGpxForDatabase,
  getStartTime,
  getEndTime,
  getDuration,
  msToTimestamp,
};
