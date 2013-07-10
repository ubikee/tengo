var express = require('express')
, cons = require('consolidate');

var global = require('./global')();
var app = module.exports = express();

app.engine('html', cons.swig);
app.set('views', __dirname+'/html');
app.set('view engine', 'html');

app.get('/resume', ensureAuthenticated, function (req, res) {

	console.log('global position for user : '+req.user.id); 

	global.findById( req.user.id, function (err, data) {

		if (err)
			console.log(err);

		res.render('resume.html', { 'user' : req.user, 'global' : data });
	});
});

app.get('/inventory', ensureAuthenticated, function (req,res) {
	res.render('inventory.html');
});

function ensureAuthenticated(req, res, next) { 
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login'); 
}