let socketio = require('socket.io-client');

export const socket = socketio.connect('http://localhost:3000');

console.log(socket);

// For client side events, we will want to follow a pattern of making a function for the client action
// within said function we will execute our emit

//! Except for joinGame, leaveGame, and other general events, EVERY game event must pass the roomID along with the other data
//? a better method may be to simply store the roomID on the socket when the joinGame event occurs.
// One of our first events to emit would be a connect event that passes the user data back to the server
// said event should update our players object, but also store a userID on the socket
// if we properly persist this, we may be able to consistently connect players to the proper room no matter their socketID

//emit a custom connect event to update socket with user info
// listens for a response to that event listen for newPlayer

//! General Events
// joinGame triggers on gameRoom mount
export const joinGame = roomData => {
  // this emit expects data to be a game room name or id
  socket.emit('joinGame', roomData);
}

export const leaveGame = roomData => {
  // sends room to leave server side
  // detaches player from room  
  socket.emit('leaveGame', roomData);
}

//! GAMEPLAY EVENTS
// diceRoll 
export const diceRoll = rollMsg => {
  // this emits a single dice roll message
  // said message should be constructed from the userName
  // the dice roll, and other relevant info.
  // can simply be an object sotring those values and the message can be constructed server side
  socket.emit('diceRoll', rollMsg);
}


// addToken event
export const addToken = token => {
  // if we end up not storing the room on the socket
  // it will be imperative to pass the room through these functions
  // token should be an object containing the info needed to render to map
  socket.emit('addToken', token);
}
// moveToken event
export const moveToken = token => {
  // if we end up not storing the room on the socket
  // it will be imperative to pass the room through these functions
  // token should be an object containing the info needed to render to map
  socket.emit('moveToken', token);
}
// remove token event
export const removeToken = token => {
  // if we end up not storing the room on the socket
  // it will be imperative to pass the room through these functions
  // token should be an object containing the info needed to render to map
  socket.emit('removeToken', token);
}