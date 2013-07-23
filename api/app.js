var express = require('express')
, util = require('util')
, api = require('./api')

var app = express()

// configure Express
app.configure(function() {
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(express.static(__dirname + '/public'))
})

app.get('/', function (req,res) {
	res.send(200)
})

app.post('/login', function (req, res) {

	var user = {
		'id'		: req.param('email'),
		'password'	: req.param('password')
	}

	api.user.login(user).then(
		function(value) { res.send(200, user) },
		function(reason) { res.send(401, reason) }
	).done()
})

app.post('/signup', function (req, res) {

	var user = {
		'id'		: req.param('email'),
		'password'	: req.param('password'),
		'location'	: req.param('location'),
		'nickname'	: req.param('nickname')
	}

	api.user.registry(user).then(
		function (value) { res.send(200, value) },
		function (reason) {	res.send(400, reason) }
	).done()
})

app.get('/:user/globalPosition', function (req, res) {

	var user = req.params.user;

	api.user.globalPosition(user).then(
		function (value) { res.send(200, value) },
		function (reason) { res.send(500, reason) }
	).done()
})

app.get('/:user/inventory', function (req, res) {

	var user = req.params.user;

	api.user.inventory(user).then(
		function (value) { res.send(200, value) },
		function (reason) { res.send(500, reason) }
	).done()
})

app.get('/:user/contracts', function (req, res) {

	var user = req.params.user;

	api.user.contracts(user).then(
		function (value) { res.send(200, value) },
		function (reason) { res.send(500, reason) }
	).done()
})

app.listen(8001)
console.log('API Server listening in port 8001')
module.exports = app
