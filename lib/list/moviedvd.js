var moment = require('moment');
var _ = require('lodash');

module.exports = function (app, db) {
	var movieDvd = require('../../model/list/moviedvd')(db);

	app.get('/list/moviedvd', function (request, response) {
		var sendResponse = function (list) {
			response.send(list)

		};

		movieDvd.get(sendResponse);
	})
};