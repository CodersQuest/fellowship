const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const db = require('../database/schema.js');
const session = require('express-session');
const cookieParser = require ('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;


/********Middleware*************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session({ secret: 'anotherwellkeptsecret' }));
app.use(passport.initialize());
app.use(passport.session());

/********Middleware*************/

/***********Passport************/
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});

//strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    //may need to deserialize the suername/pw
    db.User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

//for login
app.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/dashboard/' /*+ req.user.username*/);
  });

//logout
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

//for signup
app.post('/signup', (req, res) => {
  // if name and email are unique save to db
  console.log('called', req.body)
  var player = new db.User({
    username:  req.body.username,
    email: req.body.email,
    password:   req.body.password,
    gamesOwned: 0,
    gamesPartOf: [],
    currentGames: 0
  })
  player.save((err, user) => {
    //on succcessful signup, automatically login to new session:
    req.login(user, function(err) {
      // console.log(user, 'user')
      if (err) { throw err; }
      return res.redirect('/dashboard/' /*+ req.user.username*/);
    });
  })
});
/***********Passport************/


/***********Requests************/
app.get('/games/:game', (req, res) => {
  if(req.params.game) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  } else {
    res.redirect('/dashboard');
  }
})

/***********Requests************/

/***********Listening to Server************/
const server = app.listen(port, () => {
  console.log(`listening on port ${port} you peasant!!!`)
});

/***********Listening to Server************/

/***********Socket.io setup************/
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection: ', socket.id);
});

/***********Socket.io setup************/