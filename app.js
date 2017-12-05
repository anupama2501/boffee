var http = require("http");
var url = require('url');
var fs = require('fs');
var path = require('path');
var express = require("express");
var bodyParser = require("body-parser");
var request = require('request');
var app = express();
var mongojs = require('mongojs');

app.set('port', process.env.PORT || 3040);

// static content
app.use(express.static(path.join(__dirname, 'static')));

app.set('views',path.join(__dirname,'static/views'));
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json({limit: '50mb'}));

var server = http.createServer(app);

// Require Router
require('./config/routes.js')(app);

// Start Application
server.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});