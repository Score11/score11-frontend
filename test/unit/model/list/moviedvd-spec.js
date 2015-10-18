var simple = require('simple-mock');
var expect = require('chai').expect;

describe('Movie DVD start model specs', function() {

	var dbMock;
	var movieDvd;

	var createDbMock = function() {
		var dbQueryStub = simple.stub().callFn(function(query, callback) {
			callback();
		});

		dbMock = {
			query: dbQueryStub
		};
	};

	beforeEach(function() {
		createDbMock();
		movieDvd = require('../../../../model/list/moviedvd')(dbMock);
	});

    describe('#get', function() {
        it('calls the db query method', function() {
			movieDvd.get(function() {});
			expect(dbMock.query.callCount).to.equal(1);
        });

		it('calls the provided callback', function() {
			var callbackStub = simple.stub();
			movieDvd.get(callbackStub);
			expect(callbackStub.callCount).to.equal(1);
			expect(callbackStub.calls[0].args[0]).to.eql({ movies: [], total: 0 });
		});
    });
});