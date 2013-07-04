var should = require('should')
, users  = require('../libs/users')();

describe('Tengo User Registry', function () {

	var user = { 
		'id'		: 'peter@gmail.com',
		'password'	: 'secret',
		'nickname'  : 'peter'
	}

	before(function (done) {
		done();
	});
	
	it('should signup user', function (done) {
		
		users.signup(user, function(error, user) {
			should.not.exist(error);
			user.should.have.property('id');
		});

		done();
	});

	it('should login user', function (done) {

		users.login(user, function (error, user) {
			should.not.exist(error);
			user.should.have.property('id');
		});

		done();
	});

	it('should find one by id', function (done) {

		users.findOne(user.id, function (error, user) {
			should.not.exist(error);
			user.should.have.property('id');
			user.should.have.property('nickname');
		});

		done();
	});
});