var express = require('express');
var http = require('http');
var request = require('request');
var fs = require("fs");
var bodyParser = require('body-parser');

var app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var lastUpdate = new Date();

app.get('/test',function(req,res) {
	res.send('Working!');
	res.end;
})

app.post('/data',function(req,res) {
	var light = req.body.light;
	var temp = req.body.temp;
	var headers = {
		'Content-Type':     'application/x-www-form-urlencoded'
	}
	// Configure the request
	var options = {
		url: 'http://localhost/php/addData.php',
		method: 'POST',
		headers: headers,
		form: {'Light': light, 'Temp': temp}
	}
	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.sendStatus(response.statusCode);
		}
	})
})	

var server = app.listen(8000, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})

