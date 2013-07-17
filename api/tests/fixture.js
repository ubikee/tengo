var Q = require('q')
, Db = require('mongodb').Db
, Server = require('mongodb').Server

var config = require('../config')() 

var data = {
	'users' : [
		{ 'id' : 'jeroldan@gmail.com', 	'password' : 'jeroldan', 	'nickname' : 'jeroldan' 	},
		{ 'id' : 'anavi@gmail.com', 	'password' : 'anavi', 		'nickname' : 'anavi' 		},
		{ 'id' : 'juanperro@gmail.com', 'password' : 'juanperro', 	'nickname' : 'juanperro' 	},
		{ 'id' : '1@1.1', 				'password' : '1', 			'nickname' : 'uno' 			}
	],
	'globalPositions' : [
		{ 'id' : 'jeroldan@gmail.com', 	'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
		{ 'id' : 'anavi@gmail.com', 	'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
		{ 'id' : 'juanperro@gmail.com', 'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
		{ 'id' : '1@1.1', 				'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
	],
	'inventories' : [
		{ 'id' : 'jeroldan@gmail.com', 'items' : [ 
			{ 'id' : 'item1', 	'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item2', 	'type' : 'house', 	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item3', 	'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item4', 	'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]},
		{ 'id' : 'anavi@gmail.com', 'items' : [ 
			{ 'id' : 'item5', 	'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item6', 	'type' : 'house', 	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item7', 	'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item8', 	'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]},
		{ 'id' : 'juanperro@gmail.com', 'items' : [ 
			{ 'id' : 'item9', 	'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item10', 	'type' : 'house',	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item11', 	'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item12', 	'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]},
		{ 'id' : '1@1.1', 'items' : [ 
			{ 'id' : 'item13', 	'type' : 'house',	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item14', 	'type' : 'house',	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item15', 	'type' : 'car',		'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item16', 	'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]}
	],
	'contracts' : [
		{ 'id' : 'jeroldan@gmail.com', 'items' : [ 
			{ 'id' : 'contract1',	'type' : 'water supply',	'provider' : 'provider1' },
			{ 'id' : 'contract2',	'type' : 'electric supply',	'provider' : 'provider2' }
		]},
		{ 'id' : '1@1.1', 'items' : [ 
			{ 'id' : 'contract3',	'type' : 'water supply',	'provider' : 'provider1' },
			{ 'id' : 'contract4',	'type' : 'electric supply',	'provider' : 'provider2' }
		]}
	],
	'market' : [
		{ 'id' : 'house', 	'attributes' : { 'label' : { 'type' : 'string', 'need' : 'manadatory' } } },
		{ 'id' : 'car', 	'attributes' : { 'label' : { 'type' : 'string', 'need' : 'manadatory' } } },
		{ 'id' : 'job', 	'attributes' : { 'label' : { 'type' : 'string', 'need' : 'manadatory' } } }
	]
}

function prepareCollection (db, collectionName) {
	var deferred = Q.defer()
	db.dropCollection(collectionName, function (err, collection){
		db.createCollection(collectionName, function (err, collection) {
			if (err) deferred.reject()
			collection.insert(data[collectionName], {w:1}, function (err, result) {
				if (err) deferred.reject()
				collection.ensureIndex({id:1}, {unique:true, background:true, dropDups:true, w:1}, function(err, indexName) {
					deferred.resolve(collection)
				})
			})
		})
	})
	return deferred.promise
}

function fixture() {

	var db = new Db(config.mongo.database, new Server(config.mongo.server, config.mongo.port, {}), {safe:true})
	
	return {
		run : function() {

			var deferred = Q.defer();

			db.open(function(err, db) {

				if (process.env.NODE_ENV==='production') {
					db.authenticate('nodejitsu_juergas', '8dubrcu32rnd5n3vatnndmp102', function (err, replies) {
						// You are now connected and authenticated.
					})
				}

				prepareCollection(db, 'users')
				.then( function (value) { return prepareCollection(db, 'market') })
				.then( function (value) { return prepareCollection(db, 'inventories') })
				.then( function (value) { return prepareCollection(db, 'globalPositions') })
				.then( function (value) { return prepareCollection(db, 'contracts') })
				.fail( function (error) { deferred.reject() })
				.done( function ()      { deferred.resolve() })
			})
		
			return deferred.promise
		}
	}
}

module.exports = fixture()