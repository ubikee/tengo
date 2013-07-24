
var express = require('express')
, cons = require('consolidate');

var app = module.exports = express();

app.engine('html', cons.swig);
app.set('views', __dirname+'/html');
app.set('view engine', 'html');

app.get('/', function (req, res) {
	res.render('welcome.html', { 'user' : req.user });
});

app.get('/home', function (req, res) {
	console.log("usuario : "+req.user);
	res.render('welcome.html', { 'user' : req.user }); 
});

app.get('/contact', function (req, res) {
	res.render('contact.html');
});

app.get('/documentation', function (req, res) {
	res.render('documentation.html');
});

app.subscribe = function() {
	console.log('culo site')
}