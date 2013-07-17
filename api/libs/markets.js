var Q = require('q')
, mongodb = require('mongodb')
, _ = require('underscore')
, config = require('../config')();

function markets() {
 
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

		catalog : function() {

			var deferred = Q.defer();

			db.collection('market', function (err, collection) {

				if (err) deferred.reject(err);

				collection.find().toArray(function(err, results) {
					if (err) deferred.reject(err);	
					deferred.resolve(results);
				});
			});

			return deferred.promise;
		},

		registry : function (product) {

			var deferred = Q.defer();

			db.collection('market', function (err, collection) {

				if (err) deferred.reject(err);

				collection.findOne({'type' : product.type}, function (err, document) {

					if (err) deferred.reject(err);
				
					if (document) deferred.reject(new Error('product already exists!'));

					collection.insert(product, {safe:true}, function (err, records) {	
						if (err) deferred.reject(err);
						deferred.resolve(records[0]);
					});
				});

			});

	  		return deferred.promise;
		}
	}
}

module.exports = markets;