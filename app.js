var express = require('express');
var port = process.env.PORT || 1337;

app = module.exports = express();

app.listen(port, function () {
	console.log('Server listening on port ' + port);
});