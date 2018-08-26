// handle our socket events and more here.
let socketIo = require('socket.io');
const sharedSession = require('express-socket.io-session');
// ! should be removed when we allow proper setup of userAvatar's.
const userAvatar = 'https://i.imgur.com/XUsbw4H.png';
// ! In memory storage tracking, all current players, all running games, and all running rooms tied to games.
let games = {}; let players = {}; let rooms = {};

module.exports = function(server, session) {
  let io = socketIo.listen(server);
  io.use(sharedSession(session));
  io.on('connection', function(socket) {
    /**
     * playerConnect event specific to tie logged in userData to a socket.
     * expects a userData object containing, userName and a unique userID
     */
    socket.on('playerConnect', (userData) => {
      if (userData) {
        socket.username = userData.username;
        socket.uid = userData._id;
        if (!players[socket.uid]) {
          socket.room = null;
          socket.isInGame = false;
          // add player to players object
          players[socket.uid] = {
            socket: socket.id,
            username: socket.username,
            room: socket.room,
            uid: socket.uid,
            isInGame: socket.isInGame,
          };
          socket.emit('newPlayer', 'New Player Established');
        } else if (players[socket.uid]) {
          // check if same player connected through a different socket.
          if (players[socket.uid].socket !== socket.id) {
            // overwrite the socket with the new socket.id
            players[socket.uid].socket = socket.id;
            socket.room = players[socket.uid].room;
            socket.isInGame = players[socket.uid].isInGame;
            socket.emit('newPlayer', 'Existing Player Updated');
          }
        }
      }
    });

    socket.on('logout', () => {
      // ! handle removing player upon logout
      // ! might be redundant considering disconnect will take care of this too.
    });

    socket.on('disconnect', function() {
      console.log('Player disconnected');
      // ! should handle removing player entry in players object
    });
    /** ***** JOINING/LEAVING GAMES *******/
    /** ***********************************/
    socket.on('joinGame', (game) => {
      // ! attach roomID to the socket
      if (game && (socket.isInGame === false) ) {
        const roomID = game.gameId;
        if ( !(games[roomID]) ) {
          // add currentPlayer holder to passed game
          rooms[roomID] = []; // add player information to this rooms holder
          // add currentGame from connected player to games
          games[game.gameId] = game;
          socket.room = roomID;
          // associate room to player
          players[socket.uid].room = roomID;
          players[socket.uid].isInGame = true;
          socket.isInGame = true;
          rooms[roomID].push({
            player: socket.username,
            image: userAvatar,
          });
          // join room
          socket.join(roomID);
          // Emit current game information to all clients in room.
          io.in(socket.room).emit('gameStatusUpdated', {
            logs: games[socket.room].gameLog,
            tokens: games[socket.room].gameTokens,
            players: rooms[socket.room],
          });
        } else if (games[roomID]) {
          // handle socket reassignment in order to track their room and in game status
          socket.room = roomID;
          socket.isInGame = true;
          // handle player entry in memory to contain the same information as the socket.
          players[socket.uid].room = roomID;
          players[socket.uid].isInGame = true;
          rooms[roomID].push({
            player: socket.username,
            image: userAvatar,
          });
          // handles socket joining a room and emitting updated info to all clients in room.
          socket.join(roomID);
          // Emit current game information to all clients in room.
          io.in(socket.room).emit('gameStatusUpdated', {
            logs: games[socket.room].gameLog,
            tokens: games[socket.room].gameTokens,
            players: rooms[socket.room],
          });
        }
      }
    });

    socket.on('leaveGame', () => {
      // ! leaveGame must set the socket's room to null, set the socket's isInGame to false
      const oldRoom = socket.room;
      socket.room = null;
      socket.isInGame = false;
      // ! leaveGame must also reset these same properties on the player in the players store
      players[socket.uid].room = null;
      players[socket.uid].isInGame = false;
      // ! leaveGame must handle removing that player from the list of currentPlayers in the rooms store.
      if (rooms[oldRoom].length > 0) {
        rooms[oldRoom].forEach((player, index) => {
          if (player.player === socket.username) {
            rooms[oldRoom].splice(index, 1);
          }
        });
        socket.leave(oldRoom);
        io.in(oldRoom).emit('playerLeft', rooms[oldRoom]);
      }
      // in addition use oldRoom to update users in that room with the updated user list
      if (rooms[oldRoom].length === 0) {
        // have to handle case of last user leaving and room no longer being populated.
        delete rooms[oldRoom];
        // ! TODO: implement saving game to database and removing game from games upon asynch success.
      }
    });

    /** **** IN GAME EVENT LISTENERS ******/
    /** ***********************************/
    socket.on('diceRoll', (data) => {
      // ! should have game and room attached
      const _game = games[socket.room];
      // find game, add dice roll message to game's log
      _game.gameLog.push(data);
      // only going to keep the most recent 50-70 messages
      // send updated log back to clients in room.
      io.in(socket.room).emit('updateLog', games[socket.room].gameLog);
    });

    socket.on('moveToken', (token) => {


    });

    socket.on('addToken', (token) => {
      // ! handles adding token to tokens array
      // ! emits should emit same tokenUpdate event for every token listener.
    });

    socket.on('deleteToken', (token) => {

    });

    // ! TODO: Handle listener for player submitted messages to log.
    socket.on('sendMessage', function(data) {
      // ! TODO: update for specific room.
      // ! expect data to be in shape of object with key of message
      // ! must update game log with object containing username, and message
      // Emit updated game log to all users.
      io.in(socket.room).emit('updateLog', );
    });

    /** ***** Modular Event Emitters ******/
    /** ***********************************/
    const handleTokens = (room, tokenData) => {
      io.in(room).emit('updateToken', tokenData);
    };
  });
};
