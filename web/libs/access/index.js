
var express = require('express')
, cons = require('consolidate')
, flash = require('connect-flash')
, passport 	= require('passport')
, LocalStrategy = require('passport-local').Strategy;

var users = require('./users')();

passport.use( new LocalStrategy(

	{ usernameField : 'email', passwordField : 'password' },

	function(username, password, done) { 

		var loginForm = {
			'id' 		: username,
			'password'	: password
		}

		users.login(loginForm, function (err, user, mssg) {

			if (err) { return done(err); }
			
			if (!user) {
				return done(null, false, { message : mssg });
			}
			
			return done(null, user);
		});
	}
));

passport.serializeUser(function (user, done) { 
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	users.findById(id, function (err, user) {
		done(err, user);
	});
});

var app = module.exports = express();
app.engine('html', cons.swig);
app.set('views', __dirname+'/html');
app.set('view engine', 'html');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function (req, res) {
	res.render('login.html', { 'user' : req.user, 'flash' : req.flash() });
});

app.get('/signup', function (req, res) {
	res.render('signup.html');
});

app.post('/login',
	passport.authenticate('local', { 
		successRedirect: '/resume',
		failureRedirect: '/login',
		failureFlash: true })
); 

app.post('/signup', function (req, res) {

	var user = {
		'id'		: req.param('email'),
		'password'	: req.param('password'),
		'nickname'	: req.param('nickname'),
		'location'	: req.param('location')
	}

	users.signup(user, function (error, user){
		if (error) 
			res.render('signup', { 'message' : error });
		else
			res.render('signedup', { 'user' : user.id });
	});
});

app.get('/logout', function (req, res){
	req.logout();
	res.redirect('/');
});