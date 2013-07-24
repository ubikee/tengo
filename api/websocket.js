var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/test.html')
})

server.listen(8100)

io.sockets.on('connection', function (socket) {

	console.log('socket connection ')

	socket.on('set nickname', function (name) {

		console.log('set nickname '+name);

		socket.set('nickname', name, function () {
			socket.emit('ready')
		})
	})

	socket.on('msg', function () {
		socket.get('nickname', function (err, name) {
			console.log('Chat message by ', name)
		})
	})
})