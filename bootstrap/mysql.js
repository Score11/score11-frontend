var mysql = require('mysql');
var connection = null;

module.exports = function (config) {
	if (!connection) {
		connection = mysql.createConnection(config);
		connection.connect(function (error) {
			if (error) {
				console.log('Error connecting to MySQL on ' + config.host);
				console.log(error);
				return;
			}

			console.log('Connected to MySQL on ' + config.host);
		});
	}

	return connection;
};
