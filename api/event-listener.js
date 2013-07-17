var redis = require("redis")
, users = require('./libs/users')()
, markets = require('./libs/markets')()
, bus = require('./libs/bus')();

var client1 = redis.createClient(),
client2 = redis.createClient();

var eventListener = function() {

	/* TODO : bind to event bus and register events to listen to */

	bus.eventHandler('userRegistered', function(event) {
		users.signup(event.data);
	});

	bus.eventHandler('productPurchased', function(event) {
		return users.purchase(event.data.userId, event.data.product);
	});

	bus.eventHandler('productRegistered', function(event) {
		return markets.registry(event.data);
	});

	return {
		init : function () {
			return bus.init();
		},
		stop : function () {
			bus.stop();
		}
	}
};

module.exports = eventListener();