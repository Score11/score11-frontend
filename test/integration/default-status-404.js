var assert = require('assert');
var app = require('../../app.js');
var request = require('supertest');

describe('Foo', function() {

	var server = null;

	beforeEach(function() {
	    server = request(app);
	});

	it('returns 404', function(done) {
		server
			.get('/foobar')
			.expect(404, done);
	});
});