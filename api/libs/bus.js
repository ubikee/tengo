var Q = require('q')
, redis = require("redis")
, _ = require('underscore')

function bus() {

	var publisher = redis.createClient()
	var subscriber = redis.createClient()
	var eventHandlers = {}
	var commandHandlers = {}

	return {

		command : function (cm) {
			publisher.publish('commands', cm)
		},

		commandHandler : function (type, handler) {
			if (!commandHandlers[type])
				commandHandlers[type] = []
			commandHandlers[type].push(handler)
		},

		sendEvent : function (ev) {
			publisher.publish('events', JSON.stringify(ev))
		},

		eventHandler : function (type, handler) {
			if (!eventHandlers[type])
				eventHandlers[type] = []
			eventHandlers[type].push(handler)
		},

		init : function () {

			var deferred = Q.defer()

			subscriber.on('subscribe', function(channel, count) {
				deferred.resolve()
			})

			subscriber.on('message', function (channel, ev) {

				var event = JSON.parse(ev)

				if (channel === 'events') {
					_.each(eventHandlers[event.type], function (handler) {
						handler(event)
					})
				} else if (channel === 'commands') {
					_.each(commandHandlers[event.type], function (handler) {
						handler(event)
					})
				}
			})

			subscriber.subscribe('events')
			//subscriber.subscribe('commands')

			return deferred.promise
		},

		stop : function () {
			subscriber.unsubscribe('events')
			subscriber.unsubscribe('commands')
		}
	}
}

module.exports = bus