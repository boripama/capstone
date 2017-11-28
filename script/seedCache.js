const db = require('../server/db');
const { User, Activity, Comment, Follower } = require('../server/db/models');
const { updateSuggestions, findAndUpdateCache, determineIfCached } = require('../server/utils/reco');

async function seed() {
  await db.sync();
  console.log('db synced!');

  const firstActivity = await Promise.all([
    Activity.findById(1),
    Activity.findById(257),
    Activity.findById(609),
    Activity.findById(909),
    Activity.findById(1152),
    Activity.findById(1358)
  ]);
  console.log(`found first activity for each user`);
  await firstActivity.forEach(act => act.update({ cached: true }));
  console.log(`first activity for each user has been cached`);

  await findAndUpdateCache(1);
  console.log(`user 1 findAndUpdateCache complete`);
  await findAndUpdateCache(2);
  console.log(`user 2 findAndUpdateCache complete`);
  await findAndUpdateCache(3);
  console.log(`user 3 findAndUpdateCache complete`);
  await findAndUpdateCache(4);
  console.log(`user 4 findAndUpdateCache complete`);
  await findAndUpdateCache(5);
  console.log(`user 5 findAndUpdateCache complete`);
  await findAndUpdateCache(6);
  console.log(`user 6 findAndUpdateCache complete`);

  await updateSuggestions(1, 2);
  await updateSuggestions(1, 3);
  await updateSuggestions(1, 4);
  await updateSuggestions(1, 5);
  await updateSuggestions(1, 6);
  console.log(`user 1 comparisons complete`);
  await updateSuggestions(2, 3);
  await updateSuggestions(2, 4);
  await updateSuggestions(2, 5);
  await updateSuggestions(2, 6);
  console.log(`user 2 comparisons complete`);
  await updateSuggestions(3, 4);
  await updateSuggestions(3, 5);
  await updateSuggestions(3, 6);
  console.log(`user 3 comparisons complete`);
  await updateSuggestions(4, 5);
  await updateSuggestions(4, 6);
  console.log(`user 4 comparisons complete`);
  await updateSuggestions(5, 6);
  console.log(`user 5 comparisons complete`);
  console.log(`user 6 comparisons complete`);
}


seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing db connection');
    db.close();
    console.log('db connection closed');
  });
console.log('getting suggestions...');
