const mongoose = require('mongoose');

/** **************Connect to Mongo****************/

const DBConfig = require('../config/config').mlabdb.uri;
 // Conncet to Mongo
mongoose.connect(DBConfig)
  .then(() => {
    console.log('MongoDB Connected you peasants...');
  }).catch((err) => {
    console.log(err);
  });

/** **************Connect to Mongo****************/
/** **************Schemas****************/

let Schema = mongoose.Schema;

let userSchema = new Schema({
  username: {
    type: String, unique: true,
  },
  email: {
    type: String, unique: true,
  },
  password: String,
  gamesOwned: String,
  gamesPartOf: Array,
  currentGames: Number,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

let gameSchema = new Schema({
  gameName: String,
  gameUrl: String,
  ownerId: String,
  playerCount: String,
  currentTokenCount: String,
  // consider adding obj for current tokens on board
  battlelog: [{
    body: String, date: Date,
  }],
});

// templates for types of tokens
let tokenTemplateSchema = new Schema({
  imageUrl: String,
  name: String,
});

let tokenSchema = new Schema({
  tokenID: String,
  gameID: String,
  owner: String,
  positionX: Number,
  positionY: Number,
});


// possibly combine combatlog and dmnotes?
let combatLogSchema = new Schema({
  gameID: String,
  logEntry: String,
});

let DMnoteSchema = new Schema({
  gameID: String,
  noteText: String,
});

// may be unnecessary with nonrelational db
let playersOfGamesSchema = new Schema({
  userID: String,
  gameID: String,
});

/** **************Schemas****************/

/** **************PW HASHING****************/
// userSchema.methods.generateHash = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

// userSchema.methods.validPassword = (password) => {
//   return bcrypt.compareSync(password, this.password);
// }

/** **************PW HASHING****************/


/** **************Models****************/

let User = mongoose.model('Users', userSchema);
let Game = mongoose.model('Games', gameSchema);
let TokenTemplates = mongoose.model('TokenTemplates', tokenTemplateSchema);
let Token = mongoose.model('Tokens', tokenSchema);
let CombatLog = mongoose.model('CombatLog', combatLogSchema);
let DMnote = mongoose.model('DMnotes', DMnoteSchema);
let Player = mongoose.model('Players', playersOfGamesSchema);

/** **************Models****************/

/** **************Exports****************/

module.exports.User = User;
module.exports.Game = Game;
module.exports.TokenTemplates = TokenTemplates;
module.exports.Token = Token;
module.exports.CombatLog = CombatLog;
module.exports.DMnote = DMnote;
module.exports.Player = Player;
