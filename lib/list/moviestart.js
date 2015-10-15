var moment = require('moment');

module.exports = function (app) {
	app.get('/list/moviestart', function (request, response) {
		var today = moment().format('YYYY-M-D');
		var query = '' +
			'SELECT			d.movieID,' +
			'				date,' +
			'				title,' +
			'				year ' +
			'FROM			dvdstart	AS d ' +
			'INNER JOIN		title_m		AS m ' +
			'USING			(movieid) ' +
			'WHERE			d.date >= "' + today + '"';

		app.db.query(query, function (error, rows, fields) {
			console.log(rows);
			response.send({});
		});
	})
};