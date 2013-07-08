var express = require('express')
, cons = require('consolidate');

var app = module.exports = express();

app.engine('html', cons.swig);
app.set('views', __dirname+'/html');
app.set('view engine', 'html');

app.get('/resume', function (req, res){
	res.render('resume.html');
	//res.render('resume.html', { 'user' : req.user.id });
});

app.get('/inventory', ensureAuthenticated, function (req,res) {
	res.render('inventory.html');
});

function ensureAuthenticated(req, res, next) { 
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login'); 
}