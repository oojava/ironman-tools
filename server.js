var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

var osrsHs = require("osrs-wrapper");
//const {constants, hiscores} = require('osrs-api');

var skill = [
  'Overall',
  'Attack',
  'Defence',
  'Strength',
  'Hitpoints',
  'Ranged',
  'Prayer',
  'Magic',
  'Cooking',
  'Woodcutting',
  'Fletching',
  'Fishing',
  'Firemaking',
  'Crafting',
  'Smithing',
  'Mining',
  'Herblore',
  'Agility',
  'Thieving',
  'Slayer',
  'Farming',
  'Runecrafting',
  'Hunter',
  'Construction'
];


app.use(express.static(__dirname + '/node_modules'));
//app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

//server.listen(8080);

io.on('connection', function(socket){
	console.log("client connected");
	socket.on('nameLookup', function (msg) {
			//io.emit('statsRecieved', "sent");
			console.log("the name is: " + msg);
			osrsHs.hiscores.getPlayer(msg).then(player=> {
				console.log(player);
//				console.log(player["Skills"]);
        for(i=0; i < skill.length; i++){
				  io.emit('statsRecieved', i + " " + player["Skills"][skill[i]].level + " " + player["Skills"][skill[i]].xp);
        }
				io.emit('statsRecieved', 24 + " " + player["Skills"][skill[0]].level + " " + player["Skills"][skill[0]].xp);
				//io.emit('statsRecieved', player["Skills"]['Attack'].level);

				io.emit('statsRecieved',"test");
			});
	});
});

server.listen(process.env.PORT || 8080, function(){
	console.log('listening on port 8080');
});
