var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', function(req, res){
  res.sendFile('/Users/andrewlaw/personal/chat-simple/index.html');
});

io.on('connection', function(socket) {
	console.log('user connected');
	io.emit('chat message', 'A user has connected.');

	/*
	io.emit('join', socket);

	socket.on('join', function(name){
		users[socket.id] = name;
	});
	*/

	socket.on('chat message', function(msgObject) {
		if (msgObject.name == "") {
            users[socket.id] = "Anonymous";
		} else {
			users[socket.id] = msgObject.name;
		}
		io.emit('chat message', users[socket.id] + " : " + msgObject.msg);
	});

	socket.on('disconnect', function() {
		console.log('user disconnected');
		io.emit('chat message', 'A user has disconnected.');
	});

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


/*

test test test
 */