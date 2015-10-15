var config = require('iniparser').parseSync('./config.ini');
var express = require('express');
var port = process.env.PORT || 1337;
var db = require('./lib/db');

app = module.exports = express();
db.connect(config.mysql);

app.listen(port, function () {
	console.log('Server listening on port ' + port);
});