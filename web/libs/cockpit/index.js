var express = require('express')
, cons = require('consolidate');

var global = require('./global')();
var app = module.exports = express();

app.engine('html', cons.swig);
app.set('views', __dirname+'/html');
app.set('view engine', 'html');

app.get('/resume', ensureAuthenticated, function (req, res) {

	global.findById( req.user.id, function (err, data) {

		if (err)
			console.log(err);

		res.render('resume.html', { 'user' : req.user, 'info' : 'info'});
	});
});

app.get('/inventory', ensureAuthenticated, function (req,res) {
	res.render('inventory.html');
});

app.get('/contracts', function (req,res) {
	res.render('contracts.html'); 
});

app.get('/alerts', function (req,res) {
	res.render('alerts.html');
});

app.get('/reports', function (req,res) {
	res.render('reports.html');
});

app.get('/market', function (req,res){
	res.render('market.html');
});

function ensureAuthenticated(req, res, next) { 
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login'); 
}