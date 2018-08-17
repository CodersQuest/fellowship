// handle our socket events and more here.
var sio = require("socket.io");

// declare module constructor that is passed the http server to bind to
module.exports = function(server) {
  let io = sio.listen(server);
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
