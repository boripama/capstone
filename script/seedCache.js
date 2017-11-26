const db = require('../server/db');
const { User, Activity, Comment, Follower } = require('../server/db/models');
const { addToSuggested, findCache, determineIfCached} = require('../server/utils/reco');

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
  await firstActivity.forEach(act => act.update({cached: true}));
  console.log(`first activity for each user has been cached`);

  await findCache(1);
  console.log(`user 1 findCache complete`);
  await findCache(2);
  console.log(`user 2 findCache complete`);
  await findCache(3);
  console.log(`user 3 findCache complete`);
  await findCache(4);
  console.log(`user 4 findCache complete`);
  await findCache(5);
  console.log(`user 5 findCache complete`);
  await findCache(6);
  console.log(`user 6 findCache complete`);

  await  addToSuggested(1, 2);
  await  addToSuggested(1, 3);
  await  addToSuggested(1, 4);
  await  addToSuggested(1, 5);
  await  addToSuggested(1, 6);
  console.log(`user 1 comparisons complete`);
  await  addToSuggested(2, 3);
  await  addToSuggested(2, 4);
  await  addToSuggested(2, 5);
  await  addToSuggested(2, 6);
  console.log(`user 2 comparisons complete`);
  await  addToSuggested(3, 4);
  await  addToSuggested(3, 5);
  await  addToSuggested(3, 6);
  console.log(`user 3 comparisons complete`);
  await  addToSuggested(4, 5);
  await  addToSuggested(4, 6);
  console.log(`user 4 comparisons complete`);
  await  addToSuggested(5, 6);
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