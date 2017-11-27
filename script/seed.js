/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db');
const { User, Activity, Comment, Follower } = require('../server/db/models');
const seedGpxDir = require('./big-seed');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ name: 'Cody', email: 'cody@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Zeke', email: 'zeke@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Murphy', email: 'murphy@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Chili', email: 'chili@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Bento', email: 'bento@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Scott Thor', email: 'scott@email.com', password: '123', zip: 12345 }),
  ]);
  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`);
  await users[0].addFollowers([2, 3]);
  await users[1].addFollower(1);

  const user1Activities = await seedGpxDir('./script/big-seed/activity-files/user1', 1);
  console.log(user1Activities);
  const user2Activities = await seedGpxDir('./script/big-seed/activity-files/user2', 2);
  console.log(user2Activities);
  const user3Activities = await seedGpxDir('./script/big-seed/activity-files/user3', 3);
  console.log(user3Activities);
  const user4Activities = await seedGpxDir('./script/big-seed/activity-files/user4', 4);
  console.log(user4Activities);
  const user5Activities = await seedGpxDir('./script/big-seed/activity-files/user5', 5);
  console.log(user5Activities);
  const user6Activities = await seedGpxDir('./script/big-seed/activity-files/scott-activities', 6);
  console.log(user6Activities);

  /* OLD ACTIVITY SEED INFO

    const gpx1 = fs.readFileSync('./server/temp/chicago1.gpx');
    const act1 = await formatGpxForDatabase(gpx1);
    act1.title = 'Chicago Run 1';

    const gpx2 = fs.readFileSync('./server/temp/chicago2.gpx');
    const act2 = await formatGpxForDatabase(gpx2);
    act2.title = 'Chicago Run 2';

    const gpx3 = fs.readFileSync('./server/temp/california.gpx');
    const act3 = await formatGpxForDatabase(gpx3);
    act3.title = 'California Run';

    const activities = await Promise.all([
      Activity.create(act1),
      Activity.create(act2),
      Activity.create(act3)
    ]);

    await activities[0].setUser(1);
    await activities[0].addLike(1);
    await activities[0].addLike(2);

    await activities[1].setUser(2);
    await activities[1].addLike(1);
    await activities[1].addLike(2);

    await activities[2].setUser(1);

    console.log(`seeded ${activities.length} activities`);

  */

  const comments = await Promise.all([
    Comment.create({ activityId: 1, userId: 2, content: "Whoa that's fast!" }),
    Comment.create({ activityId: 1, userId: 1, content: "Yeah it was a good workout" }),
    Comment.create({ activityId: 2, userId: 3, content: "Speed up next time :)" }),
    Comment.create({ activityId: 2, userId: 1, content: "Don't listen to User 3, you're fast!" }),
  ]);

  console.log(`seeded ${comments.length} comments`);

  console.log(`seeded successfully`);
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
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

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...');
