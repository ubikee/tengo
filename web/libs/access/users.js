var mongodb = require('mongodb');
var config = require('../../config')();

function users() {
 
	var db = new mongodb.Db(config.mongo.database, new mongodb.Server(config.mongo.server, config.mongo.port, {}), {safe:true});

	db.open(function(err, db_p) {
		if (err) { throw err; }
		if (process.env.NODE_ENV==='production') {
			db.authenticate(config.mongo.user, config.mongo.password, function (err, replies) {
				// You are now connected and authenticated.
			});
		}
	});

	return {

		signup : function (user, callback ) {

			db.collection('users', function (err, collection) {


				collection.findOne({ 'id' : user.id }, function (err, document) {  	// it is not necessary anymore
																					// since users.id is unique  
																					// index for the collection 
																					// in mongodb

					if (err) callback(err,null);

					if (document) {
						callback(new Error('user already exist'),null);
					} else {
						collection.insert(user, {safe:true}, function (err, records) {
							callback(null, records[0]);
						});
					}
				});
			});
		},

		login : function (user, callback ) {

			db.collection('users', function (err, collection) {
				collection.findOne({ 'id' : user.id }, function (err, document) {

					if (err) { 
						callback(err,null);
					}

					if (document) {
						if (document.password === user.password) {
							callback(null, document);
						} else {
							callback(null, null, 'invalid password');
						}
					} else {
						callback(null, null, 'user not found');
					}
				})
			});
		},

		findById : function (id, callback ) {

			db.collection('users', function (err, collection) {
				collection.findOne({ 'id' : id }, function (err, document) {

					if (err) { 
						callback(err,null);
					}

					if (document) {
						callback(null, document);
					} else {
						callback(null, null, 'user not found');
					}
				})
			});
		}
	}
}

module.exports = users;