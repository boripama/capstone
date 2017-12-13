/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Activity = db.model('activity');

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const agent1 = request.agent(app);
    let bento;

    beforeEach(async () => {
      try {
        // creates admin user and new session
        await agent1
          .post('/auth/signup')
          .type('form')
          .send({
            email: 'bento@puppy.dog',
            password: 123,
            isAdmin: true,
          });

        bento = await User.findById(1);
      }
      catch (err) { console.error(err); }
    });

    it('GET /api/users', async () => {
      try {
        let res = await agent1.get('/api/users');

        expect(res.body).to.be.an('array');
        expect(res.status).to.be.equal(200);
        expect(res.body[0].email).to.be.equal(bento.email);
      }
      catch (err) { console.error(err); }
    });

    it('GET /api/users/:id', async () => {
      try {
        let res = await agent1
          .get('/api/users/1');

        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        expect(res.body.email).to.be.equal(bento.email);
      }
      catch (err) { console.error(err); }
    });

    it('PUT /api/users/:id', async () => {
      try {
        let res = await agent1
          .put('/api/users/1')
          .type('form')
          .send({ email: 'email@for.bento' });

        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(202);
        expect(res.body.email).to.be.equal('email@for.bento');
      }
      catch (err) { console.error(err); }
    });
  }); // end describe('/api/users')

  describe('/api/users/:id/activities', () => {
    const agent1 = request.agent(app);
    let bento, testActivity;

    beforeEach(async () => {
      try {
        // creates admin user and new session
        await agent1
          .post('/auth/signup')
          .type('form')
          .send({
            email: 'bento@puppy.dog',
            password: 123,
            isAdmin: true,
          });

        testActivity = await Activity.create({
          title: 'super run',
          polyline: '_p~iF~ps|U_ulLnnqC_mqNvxq`@',
          startTime: Date.now(),
          endTime: Date.now() + 100000,
        });

        await testActivity.setUser(1);

        bento = await User.findById(1);
      }
      catch (err) { console.error(err); }
    });

    it('GET /api/users/:id/activities', async () => {
      try {
        let res = await agent1.get('/api/users/1/activities');

        expect(res.body).to.be.an('array');
        expect(res.status).to.be.equal(200);
        expect(res.body[0].title).to.be.equal('super run');
      }
      catch (err) { console.error(err); }
    });

    it('POST /api/users/:id/activities', async () => {
      try {
        let res = await agent1
          .post('/api/users/1/activities')
          .field('title', 'posted activity')
          .attach('gpx', 'script/big-seed/activity-files/test.gpx');

        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(201);
        expect(res.body.title).to.be.equal('posted activity');
      }
      catch (err) { console.error(err); }
    });
  }); // end describe('/api/users/:id/activities')
}); // end describe('User routes')
