
var express = require('express')
, cons = require('consolidate')
, flash = require('connect-flash')
, passport 	= require('passport')
, LocalStrategy = require('passport-local').Strategy
, config = require('../../config')()
, api = require('tengo-api')(config)

//var users = require('./users')()

passport.use( new LocalStrategy(

	{ usernameField : 'email', passwordField : 'password' },

	function(username, password, done) { 

		var loginForm = {
			'id' 		: username,
			'password'	: password
		}

		api.user.login(loginForm).then( function (user) {

			return done(null, user)

		}).fail(function (err) {

			if (err.message === 'invalid password')
				return done(null, false, { message : err.message })

			if (err.message === 'user not found')
				return done(null, false, { message : err.message })

			return done(err)

		}).done()
	}
))

passport.serializeUser(function (user, done) { 
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {

	api.user.findById(id).then(function (user) { 
		done(null, user) 
	}).fail(function (err) { 
		done(err,null) 
	}).done()
})

var app = module.exports = express()
app.engine('html', cons.swig)
app.set('views', __dirname+'/html')
app.set('view engine', 'html')
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.get('/login', function (req, res) {
	res.render('login.html', { 'user' : req.user, 'flash' : req.flash() })
})

app.get('/signup', function (req, res) {
	res.render('signup.html')
})

app.post('/login',
	passport.authenticate('local', { 
		successRedirect: '/resume',
		failureRedirect: '/login',
		failureFlash: true })
) 

app.post('/signup', function (req, res) {

	var user = {
		'id'		: req.param('email'),
		'password'	: req.param('password'),
		'nickname'	: req.param('nickname'),
		'location'	: req.param('location')
	}

	api.user.findById(user.id)
	.then( function (value) {
		res.render('signup', { 'message' : 'user '+user.id+' already exist !!!' })
	})
	.fail( function (reason) {
		res.render('signedup', { 'user' : user.id })
	})
})

app.get('/logout', function (req, res){
	req.logout()
	res.redirect('/')
})

app.subscribe = function() {
	console.log('culo access')
}