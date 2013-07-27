var express = require('express')
, cons = require('consolidate')
, config = require('../../config')()
, api = require('tengo-api')(config)

var app = module.exports = express()

app.engine('html', cons.swig)
app.set('views', __dirname+'/html')
app.set('view engine', 'html')

/* 
 * Global Position
 */
app.get('/resume', ensureAuthenticated, function (req, res) {

	var data = {}

	api.user.globalPosition(req.user.id).then( function (value) {

		data.global = { 
			'cash' : value.cash,
			'fixed' : value.fixed,
			'scheduled' : value.scheduled,
			'unexpected' : value.unexpected
		}
		res.render('resume.html', { 'user' : req.user, 'data' : data })

	}).fail( function (reason) {
		res.render('resume.html', {'user' : req.user, 'data' : data, 'error' : { 'message' : reason }})
	}).done()
})

/* 
 * Inventory
 */
app.get('/inventory', ensureAuthenticated, function (req,res) {

	var data = {}

	api.user.inventory(req.user.id).then( function (value) {

		data.inventory = value
		res.render('inventory.html', { 'user' : req.user, 'data' : data })

	}).fail( function (reason) {
		res.render('inventory.html', {'user' : req.user, 'data' : data, 'error' : { 'message' : reason }})
	}).done()
})

/*
 * Market
 */
app.get('/market',  ensureAuthenticated, function (req, res) {

	var data = {}

	api.market.catalog().then( function (value) {

		data.market = value
		res.render('market.html', { 'user' : req.user, 'data' : data })

	}).fail( function (reason) {
		res.render('market.html', {'user' : req.user, 'data' : data, 'error' : { 'message' : reason }})
	}).done()
})

app.post('/market/purchase', ensureAuthenticated, function (req, res) {

	var product = { 'p' : 'p1' }

	api.market.purchase(req.user.id, product);

	res.send({'user' : req.user, 'data' : JSON.stringify(product), 'error' : { 'message' : 'culo' }})

})

/*
 * Contracts
 */
app.get('/contracts',  ensureAuthenticated, function (req, res) {
	res.render('contracts.html', { 'user' : req.user }) 
}) 

app.get('/alerts',  ensureAuthenticated, function (req, res) {
	res.render('alerts.html', { 'user' : req.user })
})

app.get('/reports',  ensureAuthenticated, function (req, res) {
	res.render('reports.html', { 'user' : req.user })
})


app.get('/profile',  ensureAuthenticated, function (req, res) {
	res.render('profile', { 'user' : req.user })
})

app.subscribe = function(socket) {
	
	console.log('register cockpit event listeners')
	
	api.events.addEventHandler('purchased', function(event) {

		console.log('running event handler for' + JSON.stringify(event))
		
		socket.emit('purchased', { 'event' : event })
	})
}

function ensureAuthenticated(req, res, next) { 
	if (req.isAuthenticated()) { 
		return next() 
	}
	res.redirect('/login') 
}
