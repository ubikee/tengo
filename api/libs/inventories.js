var Q = require('q')
, _ = require('underscore')
, mongodb = require('mongodb')

function inventories(db) {

	return {

		init : function (id) {

			var deferred = Q.defer()

			db.collection('inventories', function (err, collection) {

				if (err)
					deferred.reject(err)

				collection.findOne({ 'id' : id}, function (err, collection) {

					if (err)
						deferred.reject(err)

					if (document)
						deferred.reject(new Error('Inventory already initiaized for user '+id))
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
					else 
						deferred.reject(new Error('inventory not found for user '+id))
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