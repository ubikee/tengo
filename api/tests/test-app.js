var assert = require('assert')
, app    = require('../app')
, chai   = require('chai')
, http   = require('chai-http')
, should = chai.should()
, fixture = require('./fixture');

chai.use(http);

describe('API web', function() {

	before(function(done){
		fixture.run().then(done)
	})

	it('should return 200 on success', function (done) {
		chai.request(app).get('/').res( function (res) {
			res.should.have.status(200)
			done()
		})
	})
/*
	describe('login' , function() {

		it('should return 200 on success', function (done) {
			chai.request(app).post('/login')
			.req(function (req){
				var body = {'email' : 'jeroldan@gmail.com',	'password' : 'jeroldan'	}
				req.send(body)
			})
			.res(function (res) {
				res.should.have.status(200)
				done()
			})
		})

		it('should return 401 on invalid user', function (done) {
			chai.request(app).post('/login')
			.req(function (req){
				var body = { 'email' : 'invalid@gmail.com',	'password' : 'invalid' }
				req.send(body)
			})
			.res(function (res) {
				res.should.have.status(401)
				done()
			})
		})
	});

	describe('signup', function() {

		it('signup should return 200', function (done) {

			chai.request(app).post('/signup')
			.req(function (req) {

				var body = {
					'email' : 'test@test.test',
					'nickname' : 'test',
					'password' : 'test',
					'location' : 'test'
				}

				req.send(body)
			})
			.res(function (res) {
				res.should.have.status(200);
			})
		})
	})
*/
	it('GET /{userId}/globalPosition', function (done) {
		chai.request(app).get('/jeroldan@gmail.com/globalPosition').res(function (res) {
			res.should.have.status(200)
			done()
		})
	})

	it('GET /{userId}/inventory', function (done) {
		chai.request(app).get('/jeroldan@gmail.com/inventory').res(function (res) {
			res.should.have.status(200)
			done()
		})
	})

	it('GET /{userId}/contracts', function (done) {
		chai.request(app).get('/jeroldan@gmail.com/contracts').res(function (res) {
			res.should.have.status(200)
			done()
		})
	})
})