const mongoose = require('mongoose');
const DBConfig = require('../config/config').mlabdb.uri;

/****************Connect to Mongo****************/
mongoose.connect(DBConfig)
  .then(() => {
    console.log('MongoDB Connected...');
  }).catch((err) => {
    console.log(err);
  });

/****************Connect to Mongo****************/
/****************Schemas****************/

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username:  { type: String, unique: true },
  email: { type: String, unique: true },
  password:   String,
  gamesOwned: String,
  gamesPartOf: Array,
  currentGames: Number
});

var gameSchema = new Schema({
  gameName:  String,
  gameUrl: String,
  ownerId: String,
  playerCount:   String,
  currentTokenCount: String,
  //consider adding obj for current tokens on board
  battlelog: [{ body: String, date: Date }]
});

//templates for types of tokens
var tokenTemplateSchema = new Schema({
  imageUrl: String,
  name: String
});

var tokenSchema = new Schema({
  tokenID: String,
  gameID: String,
  owner: String,
  positionX: Number,
  positionY: Number
});


//possibly combine combatlog and dmnotes?
var combatLogSchema = new Schema({
  gameID: String,
  logEntry: String
});

var DMnoteSchema = new Schema({
  gameID: String,
  noteText: String
});

//may be unnecessary with nonrelational db
var playersOfGamesSchema = new Schema({
  userID: String,
  gameID: String
});

/****************Schemas****************/

/****************Models****************/

var User = mongoose.model('User', userSchema);
var Games = mongoose.model('Games', gameSchema);
var TokenTemplates = mongoose.model('TokenTemplates', tokenTemplateSchema);
var Tokens = mongoose.model('Tokens', tokenSchema);
var CombatLog = mongoose.model('CombatLog', combatLogSchema);
var DMnotes = mongoose.model('DMnotes', DMnoteSchema);
var Players = mongoose.model('Players', playersOfGamesSchema);

/****************Models****************/

/****************Exports****************/

module.exports.User = User;
module.exports.Games = Games;
module.exports.TokenTemplates = TokenTemplates;
module.exports.Tokens = Tokens;
module.exports.CombatLog = CombatLog;
module.exports.DMnotes = DMnotes;
module.exports.Players = Players;
