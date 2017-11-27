const matchActivities = require('./compareActivities');
const { addToSuggested, findAndUpdateCache, determineIfCached} = require('./compareCache');


module.exports = {
  matchActivities,
  addToSuggested,
  findAndUpdateCache,
  determineIfCached
};
