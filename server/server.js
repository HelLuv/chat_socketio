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

app.use(express.json());

const PORT = 5000;

const rooms = new Map();

app.get('/rooms', (req, res) => {

    res.json(rooms);
});

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;
    if (!rooms.has(roomId)) {
        rooms.set(
            roomId,
            new Map([
                ['users', new Map()],
                ['messages', []],
            ]),
        );
    }
    res.send();
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