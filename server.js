var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var path = require('path');

var osrsHs = require("osrs-wrapper");
//const {constants, hiscores} = require('osrs-api');

var skill = [
/*0*/  'Overall',
/*1*/  'Attack',
/*2*/  'Defence',
/*3*/  'Strength',
/*4*/  'Hitpoints',
/*5*/  'Ranged',
/*6*/  'Prayer',
/*7*/  'Magic',
/*8*/  'Cooking',
/*9*/  'Woodcutting',
/*10*/  'Fletching',
/*11*/  'Fishing',
/*12*/  'Firemaking',
/*13*/  'Crafting',
/*14*/  'Smithing',
/*15*/  'Mining',
/*16*/  'Herblore',
/*17*/  'Agility',
/*18*/  'Thieving',
/*19*/  'Slayer',
/*20*/  'Farming',
/*21*/  'Runecrafting',
/*22*/  'Hunter',
/*23*/  'Construction'
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
