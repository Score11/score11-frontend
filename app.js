var config = require('iniparser').parseSync('./config.ini');
var express = require('express');
var bootstrapMysql = require('./bootstrap/mysql');
var port = process.env.PORT || 1337;

app = module.exports = express();
bootstrapMysql(config.mysql);

require('./lib/list/moviestart')(app);

app.listen(port, function () {
	console.log('Server listening on port ' + port);
});