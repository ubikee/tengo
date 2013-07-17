var Q = require('q')
, mongodb = require('mongodb')
, _ = require('underscore')
, config = require('../config')();

function contracts() {
 
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

		findById : function (userId) {

			var deferred = Q.defer();

			db.collection('contracts', function (err, collection) {

				if (err) deferred.reject(err);

				collection.find().toArray(function(err, results) {
					if (err) deferred.reject(err);	
					deferred.resolve(results);
				});
			});

			return deferred.promise;
		}
	}
}

module.exports = contracts;