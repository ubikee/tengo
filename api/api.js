var Q = require('q')
, users = require('./libs/users')()
, markets = require('./libs/markets')()
, contracts =require('./libs/contracts')()
, inventories = require('./libs/inventories')()
, globalPosition =require('./libs/global')()
, bus = require('./libs/bus')()

var api = function() {

	bus.init()

	return {

		user : { 
			registry : function (user) {

				bus.command({ 
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
				return bus.command({ 'command' : 'purchaseProduct', data : { 'user' : userId, 'product' : product }})
			}
		}
	}
}

module.exports = api()