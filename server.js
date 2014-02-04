var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	Data = require('./DataManager');

// load data
var data = Data();
var entities = data.load('entities');
var textures = data.load('textures');

/**
 * Sockets in(on) and out(emit)
 */
io.sockets.on('connection', function (socket) {
	var loadData = {
		entities: entities,
		textures: textures
	};
	socket.emit('game:load', loadData);
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
