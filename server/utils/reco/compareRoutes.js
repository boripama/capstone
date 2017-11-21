const turf = require('@turf/turf');

const matchByCenter = (center1, center2) => {
  const lngDiff = center1[0] - center2[0];
  const latDiff = center1[1] - center2[1];

  return lngDiff <= 0.25 && latDiff <= 0.25;
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

  // console.log('intersects test', averageIntersecting);

  return averageIntersecting >= 0.02;
};

// FOR TESTING PURPOSES
const { Activity, User } = require('../../db/models');

const testFunc = async () => {
  try {
    const activity1 = await Activity.findById(1);
    const activity2 = await Activity.findById(3);
    const user1 = await User.findById(1);

    // const comments = await activity1.getComments();
    // const followers = await user1.getFollowers();
    // const userComments = await user1.getComments();
    const activityComments = await activity1.getComments();
    // console.log('user comments test', userComments);
    console.log('activity comments test', activityComments);

    // console.log('match by center test', matchByCenter(activity1.center, activity2.center));

    // console.log('intersection test', matchByIntersects(activity1, activity2));

    // const overlaps = turf.lineOverlap(line1, line2);
    // console.log('overlap test', overlaps);
  }
  catch (err) { console.error(err); }
};

testFunc();
// END TESTING SECTION
