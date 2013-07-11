var Db = require('mongodb').Db
, MongoClient = require('mongodb').MongoClient
, Server = require('mongodb').Server
, ReplSetServers = require('mongodb').ReplSetServers
, ObjectID = require('mongodb').ObjectID
, Binary = require('mongodb').Binary
, GridStore = require('mongodb').GridStore
, Grid = require('mongodb').Grid
, Code = require('mongodb').Code
, BSON = require('mongodb').pure().BSON
, assert = require('assert');

var config = require('./config')(); 

//var db = new Db('tengoMongoDB', new Server('locahost', 27017), {safe : false});
var db = new Db(config.mongo.database, new Server(config.mongo.server, config.mongo.port, {}), {safe:true});

db.open(function(err, db) {

	if (process.env.NODE_ENV==='production')
		db.authenticate('nodejitsu_juergas', '8dubrcu32rnd5n3vatnndmp102', function (err, replies) {
			// You are now connected and authenticated.
		});

	db.dropCollection('users', function (err, collection){
		db.createCollection('users', function (err, collection) {

			assert.equal(null, err);

			collection.insert(data.users, {w:1}, function (err, result) {

				assert.equal(null, err);

				collection.ensureIndex({id:1}, {unique:true, background:true, dropDups:true, w:1}, function(err, indexName) {
					//
				});
			});
		});
	});

	db.dropCollection('globalPosition', function (err, collection){
		db.createCollection('globalPosition', function(err, collection) {

			assert.equal(null, err);

			collection.insert(data.globalPosition, {w:1}, function(err, result) {

				assert.equal(null, err);

				// Create an index on the a field
				collection.ensureIndex({id:1}, {unique:true, background:true, dropDups:true, w:1}, function(err, indexName) {
					//
				});
			});
		});
	});

});

var data = {
	'users' : [
		{ 'id' : 'jeroldan@gmail.com', 	'password' : 'jeroldan', 	'nickname' : 'jeroldan' 	},
		{ 'id' : 'anavi@gmail.com', 	'password' : 'anavi', 		'nickname' : 'anavi' 		},
		{ 'id' : 'juanperro@gmail.com', 'password' : 'juanperro', 	'nickname' : 'juanperro' 	},
		{ 'id' : '1@1.1', 				'password' : '1', 			'nickname' : 'uno' 			}
	],
	'globalPosition' : [
		{ 'id' : 'jeroldan@gmail.com', 	'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
		{ 'id' : 'anavi@gmail.com', 	'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
		{ 'id' : 'juanperro@gmail.com', 'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
		{ 'id' : '1@1.1', 				'cash' : 10000, 'fixed' : 50000, 'scheduled' : 1000, 'unexpected' : 400 },
	],
	'inventory' : [
		{ 'id' : 'jeroldan@gmail.com', items : [ 
			{ 'id' : 'item1', 'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item2', 'type' : 'house', 	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item3', 'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item4', 'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]},
		{ 'id' : 'anavi@gmail.com', items : [ 
			{ 'id' : 'item5', 'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item6', 'type' : 'house', 	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item7', 'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item8', 'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]},
		{ 'id' : 'juanperro@gmail.com', items : [ 
			{ 'id' : 'item9', 'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item10', 'type' : 'house', 	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item11', 'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item12', 'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]},
		{ 'id' : '1@1.1', items : [ 
			{ 'id' : 'item13', 'type' : 'house', 	'label' : 'My House', 		'value' : '200000', 'expenses' : 500, 	'incomes' : 0 },
			{ 'id' : 'item14', 'type' : 'house', 	'label' : 'Rent House', 	'value' : '140000', 'expenses' : 50, 	'incomes' : 450 },
			{ 'id' : 'item15', 'type' : 'car', 	'label' : 'Hyundai i30', 	'value' : '9000', 	'expenses' : 300, 	'incomes' : 0 },
			{ 'id' : 'item16', 'type' : 'food', 	'label' : 'Mercadona', 		'value' : '0', 		'expenses' : 200, 	'incomes' : 0 },
		]}
	],
	'contracts' : []
}