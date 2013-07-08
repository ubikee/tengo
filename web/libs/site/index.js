
var express = require('express')
, cons = require('consolidate');

var app = module.exports = express();

app.engine('html', cons.swig);
app.set('views', __dirname+'/html');
app.set('view engine', 'html');

app.get('/', function (req, res) {
	res.render('welcome.html');
});

app.get('/home', function (req, res) {
	res.render('welcome.html');
});

app.get('/contact', function (req, res) {
	res.render('contact.html');
});

app.get('/documentation', function (req, res) {
	res.render('documentation.html');
});

