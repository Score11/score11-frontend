var moment = require('moment');
var _ = require('lodash');

module.exports = function (db) {
	return {
		get: function (callback) {
			var list = {
				movies: [],
				total: 0
			};

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

			db.query(query, function (error, rows, fields) {
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
				rows = _.toArray(rows);
				rows = _.sortBy(rows, 'releaseDate');
				list.movies = rows;
				list.total = rows.length;
				callback(list);
			});
		}
	}
};