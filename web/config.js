module.exports = function () {
	switch (process.env.NODE_ENV) {

		case 'development' : return {
			'mongo' : {
				'database' : 'tengoMongoDB',
				'server' : 'localhost',
				'port' : '27017'
			},

			'redis' : {
				'server' : 'localhost',
				'port' : '6379',
				'password' : ''
			}
		}

		case 'production' : return {
			'mongo' : {
				'database' : 'nodejitsu_juergas_nodejitsudb358675520',
				'server' : 'ds059917.mongolab.com',
				'port' : 59917,
				'user' : 'nodejitsu_juergas',
				'password' : '8dubrcu32rnd5n3vatnndmp102'
			},

			'redis' : {
				'server' : 'nodejitsudb2444660738.redis.irstack.com',
				'port' : '6379',
				'password' : 'nodejitsudb2444660738.redis.irstack.com:f327cfe980c971946e80b8e975fbebb4'
			}
		}

		default : return {}

	}
}
