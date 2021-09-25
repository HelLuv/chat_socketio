const express = require('express');
const app = express();

const server = require('http').createServer(app);
const {Server} = require('socket.io');

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket']
    }
});


const PORT = 5000;

const rooms = new Map();

app.get('/rooms', (req, res) => {
    rooms.set('hello', 'ok');
    res.json(rooms);
});

io.on('connection', socket => {
    console.log('a user connected', socket.id)
});


server.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`server started on port ${PORT}`)
});