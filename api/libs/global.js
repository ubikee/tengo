var mongodb = require('mongodb');
var config = require('../config')();

function globalPosition() {
 
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

		findById : function (id, callback) {
		
			db.collection('globalPosition', function (err, collection) {
				collection.findOne({ 'id' : id }, function (err, document) {

					if (err) callback(err,null);

					if (document) {
						callback( null, document);
					} else {
						callback( null, null, 'user not found');
					}
				})
			});
		}
	}
}

module.exports = globalPosition;