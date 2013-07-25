var Q = require('q')
, _ = require('underscore')
, redis = require("redis")

function bus(config) {

	var subscriber = {}

	var publisher = {}

	var handlers = {
		events : {},
		commands : {}
	}

	function newConnection() {
		
		var deferred = Q.defer()
		
		var conn = redis.createClient(config.redis.port, config.redis.server)
		if (process.env.NODE_ENV==='production') 
			conn.auth(config.redis.password, function () {})

		conn.on('ready', function(err) {
			if (err)
				deferred.reject()
			deferred.resolve(conn)
		})

		return deferred.promise
	}

	function publisherConnection () {
		
		var deferred = Q.defer()

		newConnection().then( function (conn) {
			publisher = conn
			deferred.resolve(conn)
		}).done()

		return deferred.promise
	}

	function subscriberConnection () {
		
		var deferred = Q.defer()
		
		newConnection().then( function (conn) {
			subscriber = conn
			subscriber.on('message', function (channel, mssg) {
				var message = JSON.parse(mssg);
				_.each( handlers[channel][message.type], function (handler) {
					handler(message)
				})
			})
			deferred.resolve(subscriber)
		}).done()

		return deferred.promise
	}

	function publish(channel, event) {
		publisher.publish(channel, JSON.stringify(event))
	}

	function subscribeChannel(channel) {
		subscriber.subscribe(channel)
	}

	function unsubscribeChannel(channel) {
		subscriber.unsubscribe(channel)
	}

	function quit() {
		subscriber.end() 
		publisher.end()
	}

	return {

		connect : function () {

			var deferred = Q.defer()

			subscriberConnection()
			.then(publisherConnection)
			.then(function (value) { subscribeChannel('events')})
			.then(function (value) { subscribeChannel('commands')})
			.then(function() {deferred.resolve()})
			.fail(function (reason) { deferred.reject(reason)})
			.done()

			return deferred.promise
		},

		stop : function () {
			unsubscribeChannel('events')
			unsubscribeChannel('commands')
			quit()
		},

		addEventHandler : function (type, handler) {
			var eventHandlers = handlers['events']
			if (!eventHandlers[type])
				eventHandlers[type] = []

			eventHandlers[type].push(handler)
			return eventHandlers[type].length
		},

		sendEvent : function (ev) {
			publish('events', ev)
		},

		clear : function () {
			handlers.events = {}
			handlers.commands = {}
		},
	}
}

module.exports = bus