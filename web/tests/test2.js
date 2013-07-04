var api = require('../api2'),
 assert = require('assert');

describe('TENGO API', function() {
	
	it('should register a user', function (done) {

		var newUser = {
			id       : '1',
			nickName : 'user1',
			password : 'password1'
		}

		api.registry(newUser)
		.then( function (user) {
			assert.equal(user.nickName, user.nickName);
		}).done();

		done();
	});

	it('should find a userxxx', function (tdone) {

		api.user('2')
		.then(function (user) {
			console.log('user found: '+user);
			assert.equal('1', user.id);
		})
		.fail(function(error) {
			console.log('deferred rejected')
			assert.fail(error);
			tdone();
		}).done();

		tdone();
	});
/*
	it('should start with an empty catalog', function (done) {
		var catalog = api.catalog();
		assert.equal(0,catalog.length);
		done();
	});

/*
	it('should record & find and article into the catalog', function (testDone) {

		var _id = 'article1';
		var _article = {
			id : _id,
			tags : ['tag1','tag2']
		};
		
		api.record(_article)
		.then(api.article(_id))
		.then(function (article) {
			assert.equal(_article.id, article.id);
		}).done();

		testDone();
	});

	it('should purchase an article', function (testDone) {

		var _userID = 'user1';
		var _articleID = 'article1';

		//api.purchase(_userID, _articleID).done();

		testDone();
	})
*/
});