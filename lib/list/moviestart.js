var moment = require('moment');
var _ = require('lodash');

module.exports = function (app) {
	app.get('/list/moviestart', function (request, response) {
		var today = moment().format('YYYY-M-D');
		var query = '' +
			'SELECT			d.movieID,' +
			'				d.date		AS releaseDate,' +
			'				version,' +
			'				title,' +
			'				year ' +
			'FROM			dvdstart	AS d ' +
			'INNER JOIN		title_m		AS m ' +
			'USING			(movieid) ' +
			'WHERE			d.date >= "' + today + '"';

		app.db.query(query, function (error, rows, fields) {
			rows = _.groupBy(rows, 'movieID');
			_.forEach(rows, function (movieEntries, key) {
				movieEntries[0].title = movieEntries.map(function (singleMovieEntry) {
					return {
						version: singleMovieEntry.version,
						title: singleMovieEntry.title
					};
				});

				var movie = movieEntries[0];
				delete movie.version;

				rows[key] = movie;
			});
			response.send(_.toArray(rows));
		});
	})
};