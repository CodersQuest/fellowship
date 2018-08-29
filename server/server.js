const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const db = require('../database/schema.js');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const auth = require('./authenticate.js');
const session = require('express-session')({
  secret: 'anotherwellkeptsecret',
  cookie: {
    // 8 hours
    maxAge: 8*60*60*1000,
  },
  resave: false,
  saveUninitialized: false,
});


const app = express();
const server = require('http').Server(app);
const port = process.env.PORT || 3000;
const saltRounds = 10;


/** ******Middleware*************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(__dirname + '/../client/dist'));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

/** ******Middleware*************/

/** *********Passport************/

// strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    db.User.findOne({
      username: username,
    }, function(err, user) {
      if (err) {
return done(err);
} else if (!user) {
        return done(null, false, {
          message: 'Incorrect username.',
        });
      } else if (user.password !== password) {
        // needs better password checker...we shouldn't be storing passwords in db as-is
        return done(null, false, {
          message: 'Incorrect password.',
        });
      } else {
        return done(null, user);
      }
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    done(err, user);
  });
});


// for login
app.post('/login',
  passport.authenticate('local', {failureRedirect: '/login',
  }), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    // console.log(res.user);
    console.log(req.session, 'sessh');
    console.log(req.user, ': the req.user logged in');

    // on successful login send user to dashboard
    // res.redirect('/dashboard/' + loggedInUserObj.username);
    res.send({
      status: 'Login successful!',
      user: req.user,
    });
  });

// logout
app.get('/logout', function(req, res) {
  req.session.destroy((err) => {
    if (err) {
      throw err;
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

// for signup
app.post('/signup', (req, res) => {
  // if name and email are unique save to db
  // console.log('called', req.body)
  let player = new db.User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    gamesOwned: 0,
    gamesPartOf: [],
    currentGames: 0,
  });
  player.save((err, user) => {
    if (err) {
      throw err;
    }
    // on succcessful signup, automatically login to new session:
    req.login(user, function(err) {
      console.log(req.user, 'user');
      if (err) {
        throw err;
      }
      return res.redirect('/');
    });
  });
});


app.get('/me', auth, function(req, res) {
  if (req.user) {
    res.status(200).json({
        status: 'Login successful!',
        user: req.user,
    });
  } else {
    res.status(401).json({
      status: 'noooooo',
    });
  }
});

app.post('/api/creategame', (req, res) => {
  // console.log('RequestBody from creategame route::::', req.body);
  let newGame = db.Game({
    gameName: req.body.gameName,
    gameDesc: req.body.gameDescription,
    gameImg: req.body.gameImage,
    gameUrl: req.body.gameUrl,
    ownerId: req.body.ownerId,
    gameOwner: req.body.gameOwner,
    players: req.body.players,
    gameTokens: req.body.gameTokens,
    gameLog: req.body.gameLog,
  });

  newGame.save((err, newGame) => {
    if (err) {
      throw err;
    } else {
      // **Still need to update user with 'gamesPartOf' */
      db.User.findOneAndUpdate(
        {username: req.body.gameOwner, },
        {$push: {gamesPartOf: `${newGame._id}`}, }
      ).exec((err, updatedUser) => {
        if (err) {
          console.log('error from update gamesPartOf in creategame route::: ', err);
          return res.status(500).send('Error updating gamesPartOf');
        }
      });
      res.send(newGame);
    }
  });
});

app.get('/api/getusergames', (req, res) => {
  const gameIdArray = req.query.gameids;
  console.log('in getUserGames route::: ', gameIdArray);
  // console.log(':::', gameIds.map((gameId) => mongoose.Types.ObjectId(gameId)));

  db.Game.find({
    '_id': {$in: gameIdArray.map((id) => mongoose.Types.ObjectId(id)),}
  })
  .exec((err, games) => {
    if (err) {
      console.log('error from findGamesById::: ', err);
      return res.status(500).send('Error finding user games');
    }
    res.send(games);
  });
});

app.put('/api/saveplayerdata', (req, res) => {
  const newContent = req.query;
  console.log('in saveplayerdata route::: ', newContent);
  res.send(newContent);
});
/** *********Passport************/

/** *********Redirects************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
/** *********Redirects************/


/** *********Requests************/
// app.get('/games/:game', auth, (req, res) => {
//   console.log(req.params.game);
//   if(req.params.game) {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     });
//   }
// });

/** *********Requests************/

/** *********Listening to Server************/
server.listen(port, () => {
  console.log(`listening on port ${port} you peasant!!!`);
});

/** *********Listening to Server************/

/** *********Socket.io setup************/

require('./socket')(server, session);

/** *********Socket.io setup************/
