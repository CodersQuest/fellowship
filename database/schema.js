const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var user = new Schema({
  username:  { type: String, unique: true },
  email: { type: String, unique: true },
  password:   String,
  gamesOwned: String,
  gamesPartOf: Array,
  currentGames: Number
});

var games = new Schema({
  gameName:  String,
  gameUrl: String,
  ownerId: String,
  playerCount:   String,
  currentTokenCount: String,
  //consider adding obj for current tokens on board
  battlelog: [{ body: String, date: Date }]
});

//next few schema tokentemplates, game tokens, dm notes, combat log, players of games?