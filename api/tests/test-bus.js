var chai = require("chai")
, should = chai.should()
, chaiAsPromised = require("chai-as-promised")
, bus = require('../libs/bus')();

chai.use(chaiAsPromised);
require("mocha-as-promised")();

describe('BUS', function(){

	it ('should subscribe and handle event', function (done) {

		bus.eventHandler('event1', function(event) {
			console.log('running event handler for' + JSON.stringify(event));
		});

		return bus.init()
		.then( 
			function (value)  { 
				bus.sendEvent({ 'type' : 'event1'});
				bus.sendEvent({ 'type' : 'event1'});
				bus.sendEvent({ 'type' : 'event1'});
			},
			function (reason) { }
		).should.be.fulfilled;

	});
});