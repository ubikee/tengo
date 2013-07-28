var Q = require('q')
, chai = require("chai")
, should = chai.should()
, chaiAsPromised = require("chai-as-promised")

chai.use(chaiAsPromised)
require("mocha-as-promised")()

var reports = require('../reports')()

describe('REPORTS integration', function() {

	this.timeout('10000')

	before( function (done) {
		
		var config = {
			'database' : 'tengoMongoDB',
			'server' : 'localhost',
			'port' : '27017'
		}

		reports.connect(config)
		.then(function() {
			done()
		})
		.done()

	})
/*
	it('should connect', function (done) {
		reports
		.connect(config)
		.then( function (value) { done() })
		.fail( function (reason) {
			console.log(reason)
			done()
		}).done()
	})
*/

	it('should report user', function () {

		reports.user.findById('1@1.1').should.eventually.have.property('nickname','uno')

	})
})
