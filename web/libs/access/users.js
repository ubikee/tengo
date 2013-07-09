var mongodb = require('mongodb');

/* PRO nodejitsu
var db = new mongodb.Db(
	'nodejitsu_juergas_nodejitsudb358675520',
	new mongodb.Server('ds059917.mongolab.com', 59917, {})
);


db.open(function (err, db_p) {
	
	if (err) { throw err; }
	
	db.authenticate('nodejitsu_juergas', '8dubrcu32rnd5n3vatnndmp102', function (err, replies) {
		// You are now connected and authenticated.
	});
});
*/

function users() {
 
	var db = new mongodb.Db('tengoMongoDB', new mongodb.Server('localhost', 27017, {}), {safe:true});

	db.open(function(err, db_p) {
		if (err) { throw err; }
	});

	return {

		signup : function (user, callback ) {

			db.collection('users', function (err, collection) {
				collection.findOne({ 'id' : user.id }, function (err, document) {

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