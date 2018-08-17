let socketio = require('socket.io-client');

const socket = socketio.connect('http://localhost:3000');

console.log(socket);