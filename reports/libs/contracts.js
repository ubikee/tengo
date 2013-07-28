var Q = require('q')
, mongodb = require('mongodb')
, _ = require('underscore')

function contracts(db) {

	return {


		init : function (id) {

			var deferred = Q.defer()

			db.collection('contracts', function (err, collection) {

				if (err)
					deferred.reject(err)

				collection.findOne({ 'id' : id}, function (err, collection) {

					if (err)
						deferred.reject(err)

					if (document)
						deferred.reject(new Error('Contracts already initiaized for user '+id))
					else {
						var inventory = { 'id' : 'jeroldan@gmail.com', 'items' : []}
						collection.insert(inventory, {w:1}, function (err, result) {
							if (err)
								deferred.reject(err)
							deferred.resolve(inventory)
						})
					}
				})
			})

			return deferred.promise
		},
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