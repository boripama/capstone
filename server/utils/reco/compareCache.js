const { ActivityCache, Activity, Rec } = require('../../db/models');
const compareActivities = require('./compareActivities');

const compareCache = async (firstId, secondId) => {
  const cache1 = await Activity.findAll({where: {userId: firstId, cached: true}});
  const cache2 = await Activity.findAll({where: {userId: secondId, cached: true}});
  let counter = 0;

  for (let i = 0; i < cache1.length; i++) {
    for (let j = 0; j < cache2.length; j++) {
      if (compareActivities(cache1[i], cache2[j])) {
        counter++;
      }
    }
  }
  let shorter;
  (cache1.length < cache2.length) ? shorter = cache1 : shorter = cache2;

  return ((counter / shorter.length) > 1.25);
};

const addToSuggested = async (firstId, secondId) => {
  let createdSuggestion = false;
  const compare = await compareCache(firstId, secondId);
  if (compare) {
    createdSuggestion = true;
    Rec.create({userId: firstId, recId: secondId});
    Rec.create({userId: secondId, recId: firstId});
  }
  return createdSuggestion ? console.log('Follower pair found') : console.log('No Follower pair');
};

//properly working function to determine if a given activity matches any activities in a cache.

const determineIfCached = (activity, cache) => {
  let addToCache = false;
  cache.some(run => {
    if (compareActivities(run, activity)) addToCache = true;
  });
  if (!addToCache) {
    activity.update({cached: true})
      .then(() => ActivityCache.create({activityId: activity.id, userId: activity.userId}))
      // .then(() => console.log('cached'))
      .catch(err => console.log(err));
  }
  // else {console.log('not cached');}
};

const findCache = async (id) => {
  let cache = await Activity.findAll({where: {userId: id, cached: true}});
  const activities = await Activity.findAll({where: {userId: id, cached: false}});
  let Idx = 0;
  while (Idx < activities.length) {
    determineIfCached(activities[Idx], cache);
    cache = await Activity.findAll({where: {userId: id, cached: true}});
    Idx++;
  }
  console.log('findCache complete');
};

module.exports = {
  addToSuggested,
  findCache,
  determineIfCached
};


// FOR TESTING PURPOSES

// const testFunc = () => {
//   try {

//     // findCache(6);
//     addToSuggested(1, 2);
//     addToSuggested(1, 3);
//     addToSuggested(1, 4);
//     addToSuggested(1, 5);
//     addToSuggested(1, 6);
//     addToSuggested(2, 3);
//     addToSuggested(2, 4);
//     addToSuggested(2, 5);
//     addToSuggested(2, 6);
//     addToSuggested(3, 4);
//     addToSuggested(3, 5);
//     addToSuggested(3, 6);
//     addToSuggested(4, 5);
//     addToSuggested(4, 6);
//     addToSuggested(5, 6);


//     console.log('complete');
//   }
//   catch (err) { console.error(err); }
// };

// testFunc();
// END TESTING SECTION
