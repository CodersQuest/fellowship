// handle our socket events and more here.
var socketIo = require("socket.io");
const sharedSession = require('express-socket.io-session');
//! We will want to store a list of games, rooms, and players in memory
// These lists should take the form of objects for constant time lookup
// Our players list should update upon socket connection,
// games and rooms should only update based on a joinRoom event
// a game instance should only be saved to the game object if it doesn't currently exist in the game object
// otherwise, we should pull the exisiting game from our game object to send back
// rooms should be updated in the same manner as the games.
// it's a good idea to track these things separately.
var games = {}, players = {}, rooms = {};


// declare module constructor that is passed the http server to bind to
module.exports = function(server, session) {
  let io = socketIo.listen(server);
  io.use(sharedSession(session));
  io.on("connection", function(socket) {
    // player has connected
    console.log("Player connected", socket.id);

    socket.on('playerConnect', userData => {
      console.log('in socket', userData);
      if (userData) {
        socket.username = userData.username;
        socket.uid = userData._id;
        socket.room = null;
        socket.isInGame = false;
        if (!players[socket.uid]) {
          // add player to players object
          players[socket.uid] = {
            socket: socket.id,
            username: socket.username,
            room: socket.room,
            uid: socket.uid,
          };
          socket.emit('newPlayer', 'New Player Established');
        } else if (players[socket.uid]) {
          if (players[socket.uid].socket !== socket.id) {
            // overwrite the socket with the new socket.id
            players[socket.uid].socket = socket.id;
            socket.emit('newPlayer', 'Existing Player Updated');
          }
        }
      }
      console.log('Current players: ', players);
    });

    socket.on("disconnect", function() {
      console.log("Player disconnected");
    });

    socket.on("send message", function(data) {
      io.emit("new message", data);
    });

    socket.on('joinGame', game => {
      //! attach roomID to the socket
      const roomID = game.gameId;
      console.log('joinGame roomId', roomID)
      // should check the gameID and query the DB
      // upon response should check if the game exists
      // console.log('Socket - joinGame init: ', game);

    });

    socket.on('diceRoll', data => {
      //! should have game and room attached
      // find game, add dice roll message to game's log
      // send updated log back to clients in room. 
    });

    socket.on('tokenMove', data => {
      //! should have game and room attached
      // grab game ID from data and lookup
      // update the token in the list on the game
      // send the updated token list back to all clients in the room
    });

  });
};
