var assert = require('assert');
var app    = require('../app');
var chai   = require('chai');
var http   = require('chai-http');

chai.use(http);

describe('Tengo API', function() {
	
	before(function(done){
		app.listen(3001);
		done();
	});
	
	it('GET / should return 200', function(done) {
		
		chai.request(app).get('/').res(function(res){
			expect(res).to.have.status(200)
		})

		done();
	});
	
	it('GET /market should return 200', function(done) {
	
		var options = {
			hostname : 'localhost',
			port     : 3001,
			path     : '/market',
			method   : 'GET'
		};
		
		var request = http.request(options, function(response) {
			response.on('data', function(chunk) {
				// assert
			});
			done();
		});
		
		request.end();
	});
	
});
