const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

// receving an event = 'connection'
io.on('connection', (socket) => {
    console.log('a user connected');

    // receving an event = 'chat message'
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        // fire an event = 'chat message' ==> send event globally to all connected sockets
        io.emit('chat message', msg);
    });

    // receving an event = 'disconnect'
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});