var Q = require('q')
, _ = require('underscore')
, mongodb = require('mongodb')
, config = require('../config')();

function inventories() {
 
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

		inventory : function (id) {

			var deferred = Q.defer()

			db.collection('inventories', function (err, collection) {

				if (err)
					deferred.reject(err)

				collection.findOne({ 'id' : id }, function (err, document) {

					if (err)
					deferred.reject(err)

					if (document)
						deferred.resolve(document.items)
				})
			})
			return deferred.promise
		},

		purchase : function (id, item) {
			
			var deferred = Q.defer();
			
			db.collection('inventories', function (err, collection) {

				if (err) 
					deferred.reject(err);

				collection.findOne({ 'id' : id }, function(err, document) {

					if (err) 
						deferred.reject(err);

					document.items.push(item);

					collection.save(document, function(err, result) {
						if (err)
							deferred.reject(err);
						deferred.resolve(result);
					});
				});
			});

			return deferred.promise;
		}
	}
}

module.exports = inventories;