var Repository = require('./repository');

function users() {

	var repository = new Repository();

	repository.save( { 
		'id'		: '1@1.1',
		'password'	: '1',
		'nickname'  : '1'
	});

	return {

		signup : function ( user, callback ) {

			repository.find( user.id, 
				function(user){
					callback('User '+user.id+' already exists !!!');
				}, 
				function() {
					repository.save( user, function (_user) { 
						callback(null, _user)
					});
				}
			);
		},

		login : function (user, callback ) {

			repository.find( user.id, 
				function (userFound) {
					if (user.password === userFound.password ) {
						callback(null, userFound);
					} else {
						callback(new Error('invalid password'), null);
					}
				},
				function (error) {
					callback(error,null);
				}
			);
		},

		findOne : function (id, callback) {
			repository.find( id, function (userFound){
				callback(null, userFound);
			}, function (error) {
				callback(error,null);
			})
		}
	}
};

module.exports = users;