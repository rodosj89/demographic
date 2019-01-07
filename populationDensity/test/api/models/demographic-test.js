'use strict';

var app = require('../../../server/server.js');

var assert = require('chai').assert;
var supertest = require('supertest');

var demographicModel = app.models.Demographic;
var userModel = app.models.User;
var token;
const user = {
  email: 'hola@mundo.com',
  password: '1234',
};
const demographic = {
  'country': 'chile',
  'population': 11222333,
};

describe('Demographic model:', function() {
  before(function() {
    userModel.destroyAll((err, res) => {
      userModel.create(user, (err, user) => {
      });
    });
    demographicModel.destroyAll();
  });

  describe('/demographics/', function() {
    afterEach(function() {
    });
    it('should response code 401 save new demographic', function() {
      var demographic = {
        'country': 'chile',
        'population': 11222333,
      };
      supertest(app)
        .post('/api/demographics/')
        .send(demographic)
        .expect('Content-Type', /json/)
        .expect(401)
        .end(function(err, res) {
          var output = res.body;
          assert.equal('AUTHORIZATION_REQUIRED',
          output.error.code);
        });
    });

    it('should response code 200 save new demographic', function() {
      userModel.login(user, (err, user) => {
        supertest(app)
          .post('/api/demographics/')
          .query({
            'access_token': user.id,
          })
          .send(demographic)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
          });
      });
    });

    it('should response code 200 get demographic by id', function() {
      userModel.login(user, (err, user) => {
        supertest(app)
        .get('/api/demographics/')
        .query({
          'access_token': user.id,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          var output = res.body[0];
          assert.equal(demographic.country,
          output.country);
          assert.equal(demographic.population,
          output.population);
        });
      });
    });
  });
});
