# Tengo-Bus

Event Bus for Tengo project. 
Makes the bus implementation transaparent to the client. 
This bus create connections to two different channels: events and commands. 
The bus user can:
- register handler functions to especific messages.  
- send messages to a channel

The exposed API makes the bus complex usage transaparent to the client.

## Installation

	npm install tengo-bus

## Configuration

The actual implementation depends on redis PUB/SUB capabilities so, a redis server is needed.
In order to establish that connection bus expect a configuration object:

	var bus = require("tengo-bus")(config)

The config data object expected has this structure:

	{
		'redis' : {
			'server' : 'localhost',
			'port' : '6379',
			'password' : ''
		}
	}

## Public API

### connect()

Start the bus handler:
- Create publisher and subscriber connections to the underlying bus mechanism. (REDIS)
- Subscribe to each channel

### stop()

End the bus handler:
- unsubsribe channels
- close connection

### addEventHandler( eventName, handler )

Add a handler function to the bus handler and bind it to a specific event.

- __eventName__ event identifier.
- __handler__ event handler function that takes in a parameter with the event.
- returns: [int] number of handlers registered for this event.

Example

	bus.addEventHandler('event1', function (ev) {
		console.log(event)
	})

### addCommandHandler (commandName, handler)

Add a handler function to the bus handler and bind it to a specific command.

- __commandName__ command identifier.
- __handler__ command handler function.
- returns: [int] number of handlers registered for this event. 

Example

	bus.addCommandHandler('command1', function (command) {
		console.log(command)
	})

### sendEvent

Example

	bus.sendEvent({ 
		'type' : 'event1', 
		'data' : { 'field1' : '1'}})
	}

### sendCommand

Example

	bus.sendCommand({ 
		'type' : 'command1', 
		'data' : { 'field1' : '1'}})
	}

### clear
Remove all handlers registerd in the bus