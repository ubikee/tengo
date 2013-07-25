var Q = require('q')
, _ = require('underscore')
, redis = require("redis")
, config = require('./config')()

function bus() {

	var subscriber = {}

	var publisher = {}

	var handlers = {
		events : {},
		commands : {}
	}

	function publisherConnection () {

		var deferred = Q.defer()

		publisher = redis.createClient(config.redis.port, config.redis.server)
		if (process.env.NODE_ENV==='production') 
			publisher.auth(config.redis.password, function () { console.log('bus : publisher -> user authenticated! ')})

		publisher.on('ready', function (err) {
			if (err)
				deferred.reject(err)

			deferred.resolve(publisher)
		})

		return deferred.promise
	}

	function subscriberConnection () {
		
		var deferred = Q.defer()
		
		subscriber = redis.createClient(config.redis.port, config.redis.server)
		if (process.env.NODE_ENV==='production') 
			subscriber.auth(config.redis.password, function () { console.log('bus : subscriber -> user authenticated! ')})

		subscriber.on('ready', function (err) {
			
			if (err)
				deferred.reject(err)
			
			subscriber.on('subscribe', function(channel, count) {

			})

			subscriber.on('message', function (channel, mssg) {
				var message = JSON.parse(mssg);
				_.each( handlers[channel][message.type], function (handler) {
					handler(message)
				})
			})

			deferred.resolve(subscriber)
		})
		
		return deferred.promise
	}

	function publish(channel, event) {
		publisher.publish(channel, JSON.stringify(event));
	}

	function subscribeChannel(channel) {
		subscriber.subscribe(channel)
	}

	function unsubscribeChannel(channel) {
		subscriber.unsubscribe(channel)
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
			subscriber.quit()
			publisher.quit()
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