module.exports = function () {
	switch (process.env.NODE_ENV) {
		case 'development' : return {
			'mongo' : {
				'database' : 'tengoMongoDB',
				'server' : 'localhost',
				'port' : '27017'
			} 
		};

		case 'production' : return {
			'mongo' : {
				'database' : 'nodejitsu_juergas_nodejitsudb358675520',
				'server' : 'ds059917.mongolab.com',
				'port' : 59917,
				'user' : 'nodejitsu_juergas',
				'password' : '8dubrcu32rnd5n3vatnndmp102'
			}
		};

		default : return {};
	}
}
