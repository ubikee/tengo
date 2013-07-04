var flash 	= require('connect-flash')
, express 	= require('express')
, passport 	= require('passport')
, util 		= require('util')
, LocalStrategy = require('passport-local').Strategy
, cons 		= require('consolidate')
, users 	= require('./libs/users')();

passport.use( new LocalStrategy(

	{
		usernameField : 'email',
		passwordField : 'password'
	},

	function(username, password, done) {
    
	    var loginForm = {
			'id' 		: username,
			'password'	: password
		}

		console.log(loginForm);

		users.login(loginForm, function(err, user) {

			if (err) { return done(err); }
			
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			
			return done(null, user);
		});
	}

));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	users.findOne(id, function (err, user) {
		done(err, user);
	});
});

var app = express();

// configure Express
app.configure(function() {
	app.engine('html', cons.swig);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'html');
	app.use(express.logger());
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.redirect('welcome.html');
});

app.get('/home', function(req, res){
	res.redirect('welcome.html');
});

app.get('/login', function(req,res){
	res.render('login');
});

app.post('/login',
	passport.authenticate('local', { 
		successRedirect: '/resume',
		failureRedirect: '/login',
		failureFlash: true })
);

app.get('/signup', function(req, res){
	res.render('signup');
});

app.post('/signup', function(req, res) {

	var user = {
		'id'		: req.param('email'),
		'password'	: req.param('password'),
		'nickname'	: req.param('nickname'),
		'location'	: req.param('location')
	}

	users.signup(user, function(error, user){
		if (error) 
			res.render('signup', { 'error' : error });
		else
			res.render('profile', { 'user' : user.id });
	});
});

app.get('/documentation', function(req, res){
	res.redirect('documentation.html');
});

app.get('/contact', function(req, res){
	res.redirect('contact.html');
});

app.get('/resume', ensureAuthenticated, function(req, res){
	res.render('resume.html', { 'user' : req.user.id });
});

app.get('/inventory', function(req,res){
	res.redirect('inventory.html');
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.listen(8000);

function ensureAuthenticated(req, res, next) {
	if (req.isAuthenticated()) { return next(); }
	res.redirect('/login')
}