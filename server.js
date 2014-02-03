var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	Data = require('./DataManager');

var data = Data();
var entities = data.load('entities');
/**
 * Sockets bitches
 */
io.sockets.on('connection', function (socket) {
	socket.emit('game:entities', entities);
});
app.use(express.static(__dirname + '/public'));
app.use('game_data', express.static(__dirname + '/game_data'));
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

var prt = process.env.PORT || 3030;
server.listen(prt, function() {
	console.log('app started on port ' + prt);
});

process.on('exit', function () {
	console.log('exit');
	data.save();
});
