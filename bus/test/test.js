var Q = require('q')
, chai = require("chai")
, should = chai.should()
, chaiAsPromised = require("chai-as-promised")
, bus = require('../bus')()

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
		bus.connect().then(function(){ done() })
	})

	beforeEach(function (done) {
		bus.clear();
		done()
	})

	it ('should subscribe event handlers', function (done) {

		bus.addEventHandler('event1', function (ev) { count++; } )
		var count1 = bus.addEventHandler('event1', function (ev) {  } )
		var count2 = bus.addEventHandler('event2', function (ev) {  } )

		delay(2000).then( function () {
			count1.should.equal(2)
			count2.should.equal(1) 
			done()
		})
	})

	it ('should handle event', function (done) {

		var count = 0

		bus.addEventHandler('event1', function (ev) { count++; } )
		bus.addEventHandler('event2', function (ev) { count++; } )

		bus.sendEvent({ 'type' : 'event1', 'data' : { 'field1' : '1'}})

		delay(2000).then( function() { 
			count.should.equal(1)
			bus.stop() 
			done() 
		})

	})
})