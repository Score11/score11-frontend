var expect = require('chai').expect;
var app = require('../../../app.js');
var request = require('supertest');
var jsonSchemaValidator = require('jsonschema').Validator;
var jsonValidator = new jsonSchemaValidator();

var apiRoute = '/list/moviedvd';

var rootListSchema = {
	id: '/RootListSchema',
	properties: {
		movies: '/ListSchema'
	},
	required: ['movies', 'total']
};

var listSchema = {
	id: '/ListSchema',
	type: 'array',
	items: '/ListReleaseSchema'
};

var listReleaseSchema = {
	id: '/ListReleaseSchema',
	type: 'object',
	properties: {
		movieId: {
			type: 'integer'
		},
		releaseDate: {
			type: 'string',
			format: 'date-time'
		},
		title: '/TitleSchema',
		year: {
			type: 'integer'
		}
	},
	required: ['movieID', 'releaseDate', 'title', 'year']
};

var titleSchema = {
	id: '/TitleSchema',
	type: 'array',
	items: '/TitleItemsSchema'
};

var titleItemsSchema = {
	id: '/TitleItemsSchema',
	type: 'object',
	properties: {
		version: {
			type: 'string'
		},
		title: {
			type: 'string'
		}
	},
	required: ['version', 'title']
};

jsonValidator.addSchema(rootListSchema);
jsonValidator.addSchema(listSchema);
jsonValidator.addSchema(listReleaseSchema);
jsonValidator.addSchema(titleSchema);
jsonValidator.addSchema(titleItemsSchema);

describe(apiRoute + ' integration test', function() {

	beforeEach(function() {
		this.server = request(app);
	});

	it('returns 200', function(done) {
	    this.server.get(apiRoute).expect(200, done);
	});

	it('returns application/json header', function (done) {
		this.server.get(apiRoute).expect('Content-Type', 'application/json; charset=utf-8').end(done);
	})

	it('has a valid json', function (done) {
		this.server.get(apiRoute).expect(200, function (error, response) {
			var validationResult = jsonValidator.validate(response.body, '/RootListSchema');
			validationResult.errors.forEach(function (error) {
				expect(error.message + ' (Schema: ' + error.schema + ')').to.equal(error.property);
			});
			done();
		})
	});
});