var flash = require('connect-flash')
, express = require('express')
, util = require('util')
, cons = require('consolidate')
, site = require('./libs/site')

var app = express()
var server = require('http').createServer(app)

// configure Express
app.configure(function() {
	app.use(express.logger())
	app.use(express.cookieParser())
	app.use(express.bodyParser())
	app.use(express.methodOverride())
	app.use(express.session({ secret: 'keyboard cat' }))
	app.use(express.static(__dirname + '/public'))

	app.use(site)
})

server.listen(8000)
console.log('listening in port 8000')

/*
var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
	console.log('connection established '+socket)
	cockpit.subscribe(socket)
})
*/