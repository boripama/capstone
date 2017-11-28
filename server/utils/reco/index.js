const matchActivities = require('./compareActivities');
const { updateSuggestions, findAndUpdateCache, determineIfCached, updateCacheAndSuggestions } = require('./compareCache');


module.exports = {
  matchActivities,
  updateSuggestions,
  findAndUpdateCache,
  determineIfCached,
  updateCacheAndSuggestions
};
