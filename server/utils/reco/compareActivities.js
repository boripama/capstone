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
  let counter = 0;

  // runs less intensive tests first, requires center and pace match
  if (matchByCenter(act1.center, act2.center)) counter++;
  else return false;

  if (matchByPace(act1.pace, act2.pace)) counter++;
  else return false;

  if (matchByDistance(act1.distance, act2.distance)) counter++;
  if (matchByStartTime(act1.startTime, act2.startTime)) counter++;

  if (counter === 2 && matchByIntersects(act1, act2)) counter++;

  return counter >= 3;
};

module.exports = matchActivities;
