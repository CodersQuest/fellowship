const mongoose = require('mongoose');

/****************Connect to Mongo****************/

mongoose.connect('mongodb://localhost/dragons');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('the mongod sends dragons');
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

var User = mongoose.model('Users', userSchema);
var Game = mongoose.model('Games', gameSchema);
var TokenTemplates = mongoose.model('TokenTemplates', tokenTemplateSchema);
var Token = mongoose.model('Tokens', tokenSchema);
var CombatLog = mongoose.model('CombatLog', combatLogSchema);
var DMnote = mongoose.model('DMnotes', DMnoteSchema);
var Player = mongoose.model('Players', playersOfGamesSchema);

/****************Models****************/

/****************Exports****************/

module.exports.User = User;
module.exports.Game = Game;
module.exports.TokenTemplates = TokenTemplates;
module.exports.Token = Token;
module.exports.CombatLog = CombatLog;
module.exports.DMnote = DMnote;
module.exports.Player = Player;
