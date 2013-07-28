var Q = require('q')
, mongodb = require('mongodb')

var api = function(config, ready) {

	var bus = require('tengo-bus')(config)
	//, reports = require('tengo.reports')(config.mongo)
	
	var db = new mongodb.Db(config.mongo.database, new mongodb.Server(config.mongo.server, config.mongo.port, {}), {safe:true})

	db.open(function(err, db_p) {

		if (err) 
			throw err

		if (process.env.NODE_ENV==='production') {
			db.authenticate(config.mongo.user, config.mongo.password, function (err, replies) {
				// You are now connected and authenticated.
			})
		}
	})


	bus.connect(config.redis)  //.then(reports.connect(config.mongo)
	.then(function (value) {
		ready(null, API)
	})

	var users = require('./libs/users')(db)
 	, markets = require('./libs/markets')(db)
	, contracts = require('./libs/contracts')(db)
	, inventories = require('./libs/inventories')(db)
	, globalPosition = require('./libs/global')(db)

	var API = {

		user : { 
			registry : function (user) {

				bus.sendCommand({ 
					'type' : 'registerUser', 
					'data' : { 'user' : user }
				})

				return { 'status' : 'processed', 'message' : 'User registration in process'}
			},

			login : function (user) {
				return users.login(user)
			},

			findById : function (id) {
				return users.findById(id)
			},

			globalPosition : function (id) {
				return globalPosition.findById(id)
			},

			inventory : function (id) {
				return inventories.inventory(id)
			},

			contracts : function (id) {
				return contracts.findById(id)
			}
		},

		market : {
			
			catalog : function() {
				return markets.catalog()
			},
			
			purchase : function(userId, product) {
				bus.sendCommand({ 'command' : 'purchaseProduct', data : { 'user' : userId, 'product' : product }})
				return { 'status' : 'processed', 'message' : 'Purchase in process'}
			}
		},

		events : {
			addEventHandler : function (event, handler) {
				bus.addEventHandler(event, handler);
			}
		}
	}
}

//module.exports = api

module.exports = function (config) {

	var deferred = Q.defer()

	api(config, function (err, api) {

		if (err)
			deferred.reject()

		console.log('API Ready')
		
		deferred.resolve(api)
	})

	return deferred.promise
}