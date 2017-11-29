const db = require('../server/db');
const { User, Activity, Comment, Follower } = require('../server/db/models');
const seedGpxDir = require('./big-seed');

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({ name: 'Cody', email: 'cody@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Zeke', email: 'zeke@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Murphy', email: 'murphy@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Chili', email: 'chili@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Bento', email: 'bento@email.com', password: '123', zip: 12345 }),
    User.create({ name: 'Scott Thor', email: 'scott@email.com', password: '123', zip: 12345 }),
  ]);

  console.log(`seeded ${users.length} users`);
  await users[0].addSomeFollowers([2, 3]);
  await users[1].addAFollower(1);

  const user1Activities = await seedGpxDir('./script/big-seed/activity-files/small-seed', 1);
  console.log(user1Activities);

  const comments = await Promise.all([
    Comment.create({ activityId: 1, userId: 2, content: "Whoa that's fast!" }),
    Comment.create({ activityId: 1, userId: 1, content: 'Yeah it was a good workout' }),
    Comment.create({ activityId: 2, userId: 3, content: 'Speed up next time :)' }),
    Comment.create({ activityId: 2, userId: 1, content: "Don't listen to User 3, you're fast!" }),
  ]);

  console.log(`seeded ${comments.length} comments`);

  console.log(`seeded successfully`);
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

console.log('seeding...');
