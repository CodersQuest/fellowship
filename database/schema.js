const mongoose = require('mongoose');

<<<<<<< HEAD
/****************Schemas****************/

var Schema = mongoose.Schema;

var userSchema = new Schema({
=======
var Schema = mongoose.Schema;

var user = new Schema({
>>>>>>> 8234612592cdfcefddd064c3185a7945d0ecd27a
  username:  { type: String, unique: true },
  email: { type: String, unique: true },
  password:   String,
  gamesOwned: String,
  gamesPartOf: Array,
  currentGames: Number
});

<<<<<<< HEAD
var gameSchema = new Schema({
=======
var games = new Schema({
>>>>>>> 8234612592cdfcefddd064c3185a7945d0ecd27a
  gameName:  String,
  gameUrl: String,
  ownerId: String,
  playerCount:   String,
  currentTokenCount: String,
  //consider adding obj for current tokens on board
  battlelog: [{ body: String, date: Date }]
});

<<<<<<< HEAD
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
var Tokens = mongoose.model('Tokens', combatLogSchema);
var DMnotes = mongoose.model('Tokens', DMnoteSchema);
var Players = mongoose.model('Tokens', playersOfGamesSchema);

/****************Models****************/

/****************Exports****************/

module.exports.User = User;
module.exports.Games = Games;
module.exports.TokenTemplates = TokenTemplates;
module.exports.Tokens = Tokens;
module.exports.DMnotes = DMnotes;
module.exports.Players = Players;
=======
//next few schema tokentemplates, game tokens, dm notes, combat log, players of games?
>>>>>>> 8234612592cdfcefddd064c3185a7945d0ecd27a
