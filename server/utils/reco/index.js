const matchActivities = require('./compareActivities');
const { updateSuggestions, findAndUpdateCache, determineIfCached} = require('./compareCache');


module.exports = {
  matchActivities,
  updateSuggestions,
  findAndUpdateCache,
  determineIfCached
};
