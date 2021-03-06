const { ActivityCache, Activity, Rec, User } = require('../../db/models');
const compareActivities = require('./compareActivities');

const compareCache = async (firstId, secondId) => {
  const cache1 = await Activity.findAll({ where: { userId: firstId, cached: true } });
  const cache2 = await Activity.findAll({ where: { userId: secondId, cached: true } });
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

const updateSuggestions = async (firstId, secondId) => {
  const shouldSuggest = await compareCache(firstId, secondId);
  const recs = [];
  if (shouldSuggest) {
    const rec1 = await Rec.findOrCreate({ where: { userId: firstId, recId: secondId } });
    const rec2 = await Rec.findOrCreate({ where: { userId: secondId, recId: firstId } });
    console.log('Follower pair found');
    recs.push(rec1, rec2);
  }
  else { console.log('No Follower pair'); }
  return recs;
};

const determineIfCached = (activity, cache) => {
  let addToCache = true;
  cache.some(run => {
    if (compareActivities(run, activity)) addToCache = false;
  });
  if (addToCache) {
    activity.update({ cached: true })
      .then(() => ActivityCache.create({ activityId: activity.id, userId: activity.userId }))
      .catch(err => console.log(err));
  }

  return addToCache;
};

const findAndUpdateCache = async (id) => {
  let cachedActivities = await Activity.findAll({ where: { userId: id, cached: true } });
  const uncachedActivities = await Activity.findAll({ where: { userId: id, cached: false } });
  for (let i = 0; i < uncachedActivities.length; i++) {
    const addToCache = await determineIfCached(uncachedActivities[i], cachedActivities);
    if (addToCache) { cachedActivities = await Activity.findAll({ where: { userId: id, cached: true } }); }
  }
  console.log('findAndUpdateCache complete');

  return cachedActivities;
};

const updateCacheAndSuggestions = async (currentUserId) => {
  const cache = await findAndUpdateCache(currentUserId);
  const otherUsers = await User.findAll({ where: { id: { $ne: currentUserId } } });
  const recs = await Rec.findAll({ where: { userId: currentUserId } });

  const userIdsToCompare = otherUsers.map(user => {
    if (!(recs.find(rec => rec.recId === user.id))) return user.id;
  });

  userIdsToCompare.filter(id => id !== undefined).forEach(id => updateSuggestions(currentUserId, id));
};

module.exports = {
  updateSuggestions,
  findAndUpdateCache,
  determineIfCached,
  updateCacheAndSuggestions,
};
