var redis = require("redis")
, bus = require('./libs/bus')()

var commandHandler = function() {

	bus.commandHandler('registerUser', function(command) {

		// create new user in domain (neo4j????)

		bus.sendEvent({ 'type' : 'event1', 'data' : command.data });
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

module.exports = commandHandler()