var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.type('text/plain');
	res.send('mpd106 api');
});

app.listen(process.env.PORT || 4730);