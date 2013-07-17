var assert = require('assert')
, app    = require('../app')
, chai   = require('chai')
, http   = require('chai-http')
, should = chai.should()

chai.use(http);

describe('API web', function() {

	before(function(done){
		done()
	})

	it('GET / should return 200', function (done) {
		chai.request(app).get('/').res( function (res) {
			res.should.have.status(200)
			done()
		})
	})

	it('POST /login should return 200', function (done) {
		chai.request(app).post('/login')
		.req(function(req){
			
			var body = {
				'email' : 'jeroldan@gmail.com',
				'password' : 'jeroldan'
			}
			
			req.send(body)
		})
		.res(function (res) {
			res.should.have.status(200)
			done()
		})
	})
})