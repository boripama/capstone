const getStartTime = gpxArray => gpxArray[0].time;

const getEndTime = gpxArray => gpxArray[gpxArray.length - 1].time;

// duration needs to be changed to ms
const getDuration = gpxArray => getEndTime(gpxArray) - getStartTime(gpxArray);

module.exports = { getStartTime, getEndTime, getDuration };
