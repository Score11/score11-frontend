var assert = require('assert');
var app = require('../../app.js');
var request = require('supertest');

describe('Returns 404 by default', function() {

	beforeEach(function() {
	    this.server = request(app);
	});

	it('returns 404', function(done) {
		this.server
			.get('/foobar')
			.expect(404, done);
	});
});