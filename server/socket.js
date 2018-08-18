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
    socket.on("disconnect", function() {
      console.log("Player disconnected");
    });
    socket.on("send message", function(data) {
      io.emit("new message", data);
    });
    socket.on('joinGame', socket => {
      //! attach roomID to the socket
    })
  });
};
