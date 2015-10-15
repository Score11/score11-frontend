var config = require('iniparser').parseSync('./config.ini');
var express = require('express');
var bootstrapMysql = require('./bootstrap/mysql');
var port = process.env.PORT || 1337;

app = module.exports = express();
app.db = bootstrapMysql(config.mysql);

require('./lib/list/moviedvd')(app);

app.listen(port, function () {
	console.log('Server listening on port ' + port);
});