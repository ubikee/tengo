var redis = require("redis")
, users = require('./libs/users')()
, markets = require('./libs/markets')()
, bus = require('./libs/bus')();

var eventListener = function() {

	bus.eventHandler('userRegistered', function(event) {

		users.signup(event.data)
		.then ( 
			function (value) { return inventories.init(event.data.id) })
		.then (
			function (value) { return contracts.init(event.data.id) })
		.fail (
			function (reason) { console.log(reason)})
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