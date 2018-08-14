const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const db = require('../database/schema.js');
const session = require('express-session');
const cookieParser = require ('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const app = express();
const port = process.env.PORT || 3000;


/********Middleware*************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(cookieParser());
app.use(session({ secret: 'anotherwellkeptsecret' }));
app.use(passport.initialize());
app.use(passport.session());

/********Middleware*************/

/***********Passport************/

//strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
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
    res.redirect('/users/' + req.user.username);
  });

//for signup

/***********Passport************/

const server = app.listen(port, () => {
  console.log(`listening on port ${port} you peasant!!!`)
});

// Socket.io setup
const io = socket(server);

io.on('connection', (socket) => {
  console.log('made socket connection: ', socket.id);
});