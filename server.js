const express = require('express');
const app = express();
const port = 8080;
const io = socketIO(express);

app.use((req,res) => res.sendFile('index.html')).listen(PORT, () => console.log('listening on 8080'));

io.on('connection', (socket) => {
	console.log('client connected');
	socket.on('disconnect', () => console.log('client disconnected'));
});
