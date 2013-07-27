var Q = require('q')
, chai = require("chai")
, should = chai.should()
, chaiAsPromised = require("chai-as-promised")
, config = require('./config')()
, bus = require('../bus')(config)

chai.use(chaiAsPromised)
require("mocha-as-promised")()

function delay (ms) {
	var deferred = Q.defer()
	setTimeout(deferred.resolve,ms)
	return deferred.promise
}

describe('bus', function () {

	this.timeout(50000) 

	before(function (done) {
		bus.connect().then(function(){ 
			console.log('  connected')
			done() 
		})
	})

	beforeEach(function (done) {
		bus.clear()
		done()
	})

	after(function(done) {
		//bus.stop()
		done()
	})
	
	it ('should subscribe event handlers', function (done) {

		bus.addEventHandler('event1', function (ev) { count++; } )
		var count1 = bus.addEventHandler('event1', function (ev) { /* DO SOMETHING */ } )
		var count2 = bus.addEventHandler('event2', function (ev) { /* DO SOMETHING */ } )

		delay(1000).then( function () {
			count1.should.equal(2)
			count2.should.equal(1) 
			done()
		})
	})

	it ('should handle event', function (done) {

		var count = 0

		bus.addEventHandler('event1', function (ev) { count++; } )

		bus.sendEvent({ 'type' : 'event1', 'data' : { 'field1' : '1'}})
		bus.sendEvent({ 'type' : 'event1', 'data' : { 'field1' : '2'}})

		delay(2000).then(function (value) { 
			count.should.equal(2)
			done() 
		})
	})

	it ('should handle command', function (done) {
		var count = 0;

		bus.addCommandHandler('command1', function (ev) { count++ })

		bus.sendCommand({ 'type' : 'command1', 'data' : { 'field1' : 'c1' }})
		bus.sendCommand({ 'type' : 'command1', 'data' : { 'field1' : 'c1' }})

		delay(2000).then(function (value) {
			count.should.equal(2)
			done()
		})
	})

})