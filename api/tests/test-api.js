var chai = require('chai')
, should = chai.should()

var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
require('mocha-as-promised')()

var api = require('../api')
, fixture = require('./fixture')

var user1 = { 
	'id' : 'test@gmail.com',
	'password' : 'test',
	'nickname' : 'test-user'
}

var user2 = {
	'id' : 'jeroldan@gmail.com',
	'password' : 'jeroldan',
	'nickname' : 'jeroldan'
}

var product1 = {
	'type' : 'test-product',
	'label' : 'Test Product'
}

before(function (done) {
	fixture.run().then(done)
})

describe('API', function(){

	it('should handle new user registry', function () {
		return api.user.registry(user1).should.have.property('status','processed')
	})

	it('should handle user login', function () {
		return api.user.login(user2).should.eventually.have.property('nickname',user2.nickname)
	})

	it('should reject existing user registry', function () {
		return api.user.registry(user1).should.be.rejected
	})

	it('should find user by id', function () {
		return api.user.findById(user2.id).should.eventually.have.property('nickname',user2.nickname)
	})

	it ('should obtain market catalog', function () {
		return api.market.catalog().should.eventually.have.length(3)
	})

	it('should purchase a product', function () {
		return api.market.purchase(user2.id, product1).should.eventually.have.property('state', 'success')
	})

	it ('should obtain user inventory', function () {
		return api.user.inventory(user2.id).should.eventually.have.length(4)
	})	

	it ('should not obtain invalid user inventory', function () {
		return api.user.inventory('invalid').should.be.rejected;
	})

});