var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//server.listen(8080);

io.on('connection', function(socket){
	console.log("client connected");
});

server.listen(8080, function(){
	console.log('listening on port 8080');
});
