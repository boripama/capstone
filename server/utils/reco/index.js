const matchActivities = require('./compareActivities');
const { addToSuggested, findCache, determineIfCached} = require('./compareCache');


module.exports = {
  matchActivities,
  addToSuggested,
  findCache,
  determineIfCached
};
