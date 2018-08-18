// handle our socket events and more here.
var socketIo = require("socket.io");
const sharedSession = require('express-socket.io-session');

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
  });
};
