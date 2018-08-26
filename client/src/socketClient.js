let socketio = require('socket.io-client');

export const socket = socketio.connect('http://localhost:3000');

// ! General Events
export const joinGame = (roomData) => {
  // ? roomData should be an object containing all game data.
  socket.emit('joinGame', roomData);
};

export const leaveGame = () => {
  // ! No need to pass anything through.
  // ! Server side socket tracks identity for proper removal from game.
  socket.emit('leaveGame');
};
// ! The following is a crucial event to connect the socket to a player
// ! Ideally, this event should run on the dashboard and game room components
export const playerConnect = (data) => {
  // expect data to be user data to setup synch between socket ID and user.
  socket.emit('playerConnect', data);
};

// ! GAMEPLAY EVENTS
export const diceRoll = (rollMsg) => {
  socket.emit('diceRoll', rollMsg);
};

export const addToken = (token) => {
  socket.emit('addToken', token);
};
// moveToken event
export const moveToken = (token) => {
  socket.emit('moveToken', token);
};
// remove token event
export const deleteToken = (token) => {
  socket.emit('deleteToken', token);
};
