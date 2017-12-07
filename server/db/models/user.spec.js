/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody;

      beforeEach(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
          .then(user => {
            cody = user;
          });
      });

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true);
      });

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false);
      });
    }); // end describe('correctPassword')

    describe('updateTotalFollowers', () => {
      let users;

      beforeEach(async () => {
        users = await Promise.all([
          User.create({ email: 'bento@puppy.dog' }),
          User.create({ email: 'chili@big.dog' })
        ]);

        await users[0].addFollowee(2);
      });

      it('sets the totalFollowers property to the number of followers a user has', async () => {
        expect(users[0].totalFollowers).to.equal(0);
        await users[0].updateTotalFollowers();
        expect(users[0].totalFollowers).to.equal(1);
      });
    }); // end describe('updateTotalFollowers')

    describe('updateTotals', () => {
      let fakeActivity, bento;

      beforeEach(async () => {
        bento = await User.create({ email: 'bento@puppy.dog' });
        fakeActivity = { distance: 14, duration: 40 };
      });

      it("updates a user's totals based on the activity passed in", async () => {
        expect(bento.totalDistance).to.equal(0);
        expect(bento.totalTime).to.equal(0);
        await bento.updateTotals(fakeActivity);
        expect(bento.totalDistance).to.equal(14);
        expect(bento.totalTime).to.equal(40);
      });
    }); // end describe('updateTotals')
  }); // end describe('instanceMethods')

  describe('validations', () => {
    describe('zip', () => {
      let bento;

      it('throws a descriptive error if zip is not 5 digits', async () => {
        try {
          bento = await User.create({
            email: 'bento@puppy.dog',
            zip: 1234,
          });
        }
        catch (err) {
          expect(err.errors[0].message).to.equal('Zip must be 5 digits');
        }
      });
    });
  }); // end describe('validations')

  describe('getterMethods', () => {
    describe('totalTimeTimestamp', () => {
      let bento;

      beforeEach(async () => {
        bento = await User.create({
          email: 'bento@puppy.dog',
          totalTime: 123456,
        });

      });

      it('converts the totalTime to a timestamp', () => {
        expect(bento.totalTimeTimestamp).to.be.a('string');
        expect(bento.totalTimeTimestamp).to.equal('10:17:36');
      });
    });
  }); // end describe('getterMethods')
}); // end describe('User model')
