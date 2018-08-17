// handle our socket events and more here.

module.exports = function(io) {
  io.on('connection', function(socket) {
    console.log('Client has connected: ', socket.id);
  });
}