const turf = require('@turf/turf');
const { ActivityCache, Activity, Rec } = require('../../db/models');

//compareRun is a temporary test function to later be replaced with the real run comparison function.

const compareRun = (run1, run2) => {
  const word1 = run1.title.split(' ')[0];
  const word2 = run2.title.split(' ')[0];
  return word1 === word2;
};

//compareCache not functional yet

const compareCache = (cache1, cache2) => {
  let counter = 0;

  for (let i = 0; i < cache1.length; i++) {
    for (let j = 0; j < cache2.length; j++) {
      //assume compareRun returns a boolean
      if (compareRun(cache1[i], cache2[j])) counter++;
    }
  }
  let shorter;
  (cache1.length < cache2.length) ? shorter = cache1 : shorter = cache2;

  return ((counter / shorter.length) > 0.05);
};

const addToSuggested = (cache1, cache2) => {
  let createdSuggestion = false;
  if (compareCache(cache1, cache2)) {
    createdSuggestion = true;
    Rec.create({userId: cache1[0].userId, recId: cache2[0].userId});
    Rec.create({userId: cache2[0].userId, recId: cache1[0].userId});
  }
  return createdSuggestion ? console.log('Follower pair found') : console.log('No Follower pair');
};

//properly working function to determine if a given activity matches any activities in a cache.
const determineIfCached = (activity, cache) => {
  let addToCache = false;
  cache.some(run => {
    if (compareRun(run, activity)) addToCache = true;
  });
  if (!addToCache) {
    activity.update({cached: true})
      .then(() => ActivityCache.create({activityId: activity.id, userId: activity.userId}))
      .then(() => console.log('cached'))
      .catch(err => console.log(err));
  }
  else {console.log('not cached');}
};


// FOR TESTING PURPOSES

const testFunc = async () => {
  try {
    const activity1 = await Activity.findById(1);
    const activity2 = await Activity.findById(2);
    const activity3 = await Activity.findById(3);
    const cache = await Activity.findAll({where: { cached: true }});
    const cache1 = await Activity.findAll({where: {userId: 1, cached: true}});
    const cache2 = await Activity.findAll({where: {userId: 2, cached: true}});
    const runs = await Activity.findAll({where: {userId: cache[0].userId}});
    // console.log('1', cache1);
    // console.log('2', cache2);

    // determineIfCached(activity1, cache);

    addToSuggested(cache1, cache2);


  }
  catch (err) { console.error(err); }
};

testFunc();
// END TESTING SECTION
