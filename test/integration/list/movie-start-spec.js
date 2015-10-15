var assert = require('assert');
var app = require('../../../app.js');
var request = require('supertest');

var apiRoute = '/list/moviestart';

describe(apiRoute + ' integration test', function() {

	beforeEach(function() {
		this.server = request(app);
	});

	it('returns 200', function(done) {
	    this.server.get(apiRoute).expect(200, done);
	});
});