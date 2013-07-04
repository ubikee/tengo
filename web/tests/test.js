var assert = require('assert');
var app    = require('../app');
var http   = require('http');

describe('Tengo API', function() {
	
	before(function(done){
		app.listen(3001);
		done();
	});
	
	it('GET / should return 200', function(done) {
		
		var options = {
			hostname : 'localhost',
			port     : 3001,
			path     : '/',
			method   : 'GET'
		};
		
		var request = http.request(options, function(response) {
			response.on('data', function (chunk) {
				assert.equal('Welcome to tengo API', chunk);
			});
		});
		
		request.end();
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
