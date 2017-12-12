/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const Activity = db.model('activity');
const User = db.model('user');

describe('Activity model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('getterMethods', () => {
    let testActivity, bento;

    beforeEach(async () => {
      testActivity = await Activity.create({
        polyline: '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
        startTime: Date.now(),
        endTime: Date.now() + 100000,
      });

      bento = await User.create({ email: 'bento@puppy.dog' });

      await testActivity.setUser(1);
    });

    describe('durationTimestamp', () => {
      it('converts the duration to a timestamp', () => {
        expect(testActivity.durationTimestamp).to.be.a('string');
        expect(testActivity.durationTimestamp).to.equal('01:40');
      });
    }); // end describe('durationTimestamp')

    describe('pace', () => {
      it('calculates the pace of the activity', () => {
        let pace = testActivity.duration / testActivity.distance;
        expect(testActivity.pace).to.be.a('number');
        expect(testActivity.pace).to.equal(pace);
      });
    }); // end describe('pace')

    describe('pace', () => {
      it('converts the pace to a timestamp', () => {
        testActivity.distance = 10;
        testActivity.duration = 1234;

        expect(testActivity.paceTimestamp).to.be.a('string');
        expect(testActivity.paceTimestamp).to.equal('02:03');
      });
    }); // end describe('paceTimestamp')
  }); // end describe('getterMethods')
}); // end describe('User model')
