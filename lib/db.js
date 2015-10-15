var mysql = require('mysql');
var connection = null;

module.exports = {
	connect: function (config) {
		connection = mysql.createConnection(config);
		connection.connect(function (err) {
			if (err) {
				console.log('Error connecting to MySQL');
				console.log(err);
				return err;
			}

			console.log('Successfully connected to MySQL on ' + config.host);
		});
	},

	get: function () {
		return connection;
	}
};