var express = require('express')
, util = require('util')
, api = require('./api')

var app = express();

// configure Express
app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
});


app.get('/', function (req,res) {
	res.send(200);
});

app.post('/login', function (req, res) {

	var user = {
		'id'		: req.param('email'),
		'password'	: req.param('password')
	}

	console.log(user);

	api.user.login(user).then(
		function(value) { 
			res.send(200)
		},
		function(reason) {
			console.log(reason)
			res.send(400)
		}
	);
});

app.listen(8001);
console.log('API listening in port 8001')
module.exports = app;
