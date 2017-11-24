const turf = require('@turf/turf');

const matchByCenter = (center1, center2) => {
  const lngDiff = center1[0] - center2[0];
  const latDiff = center1[1] - center2[1];

  // return true if difference in long/lat is within .05 degrees
  return lngDiff <= 0.05 && latDiff <= 0.05;
};

const matchByIntersects = (act1, act2) => {
  const line1 = act1.getGeoJSON();
  const line2 = act2.getGeoJSON();

  const numPointsLine1 = line1.geometry.coordinates.length;
  const numPointsLine2 = line2.geometry.coordinates.length;

  const numIntersects = turf.lineIntersect(line1, line2).features.length;

  const averageIntersecting =
    ((numIntersects / numPointsLine1)
      + (numIntersects / numPointsLine2)) / 2;

  // return true if number of intersects is >= 2% of total intersections
  return averageIntersecting >= 0.02;
};

const matchByStartTime = (start1, start2) => {
  const start1TotalMins = (start1.getUTCHours() * 60) + start1.getUTCMinutes();
  const start2TotalMins = (start2.getUTCHours() * 60) + start2.getUTCMinutes();

  // return true if activities are within 3 hours of one another
  return Math.abs((start1TotalMins - start2TotalMins)) <= 180;
};

const matchByPace = (pace1, pace2) => {
  // return true if difference in pace is within 15% of pace1
  return (Math.abs(pace1 - pace2) / pace1) <= 0.15;
};

const matchByDistance = (distance1, distance2) => {
  // return true if difference in pace is within 20% of distance1
  return (Math.abs(distance1 - distance2) / distance1) <= 0.20;
};

const matchActivities = (act1, act2) => {
  // runs less intensive tests first, returns false on first false test
  if (!matchByCenter(act1.center, act2.center)) return false;
  console.log('matched center');
  if (!matchByPace(act1.pace, act2.pace)) return false;
  console.log('matched pace');
  if (!matchByDistance(act1.distance, act2.distance)) return false;
  console.log('matched distance');
  if (!matchByStartTime(act1.startTime, act2.startTime)) return false;
  console.log('matched start time');
  if (!matchByIntersects(act1, act2)) return false;
  console.log('matched intersects');

  // return true if all tests pass
  return true;
};

module.exports = matchActivities;

// FOR TESTING PURPOSES
const { Activity, User } = require('../../db/models');

const testFunc = async () => {
  try {
    const activity1 = await Activity.findById(1);
    const activity2 = await Activity.findById(3);

    // const user1 = await User.findById(1);
    // const comments = await activity1.getComments({
    //   include: [{model: User, attributes: ['name', 'email']} ]});
    // console.log(comments);

    // console.log('overall match test', matchActivities(activity1, activity2));
    // console.log('distance test', matchByDistance(activity1.distance, activity2.distance));
    // console.log('pace test', matchByPace(activity1.pace, activity2.pace));
    // console.log('start time test', matchByStartTime(activity1.startTime, activity2.startTime));
    // console.log('center test', matchByCenter(activity1.center, activity2.center));
    // console.log('intersection test', matchByIntersects(activity1, activity2));
  }
  catch (err) { console.error(err); }
};

testFunc();
// END TESTING SECTION
