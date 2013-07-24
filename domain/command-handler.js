var redis = require("redis")
, bus = require('./libs/bus')()

var commandHandler = function() {

	bus.init().then(function() {

		bus.commandHandler('registerUser', function (command) {

			// create new user in domain (neo4j????)
			console.log('register user command handler')

			bus.sendEvent({ 'type' : 'userRegistered', 'data' : command.data });
		})

		bus.commandHandler('productPurchase', function (command) {

			// process purchase
			console.log('process purchase command handler')

			bus.sendEvent({ 'type' : 'purchased', data : {}})

		})

	})

	return {
		init : function () {
			return bus.init()
		},
		stop : function () {
			bus.stop()
		}
	}
}

module.exports = commandHandler