const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../database/schema.js');
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
  saveUninitialized: true,
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

// app.use((req, res, next) => {
//   res.locals.success_message = req.flash('success_message');
//   res.locals.error_message = req.flash('error_message');
//   res.locals.error = req.flash('error');
//   res.locals.user = req.user || null;
//   next();
// });
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
  passport.authenticate('local', {
    failureRedirect: '/login',
  }), (req, res) => {
    const loggedInUserObj = req.user;
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
    req.logout();
    console.log('hi');
    req.session.destroy(function(err) {
      if (err) {
throw err;
}
      // no session here
      console.log('hey');
      res.redirect('/');
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
      return res.redirect('/dashboard/' + user.username);
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

app.get('/dashboard/:id', auth, (req, res) => {
  if (req.user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

/** *********Requests************/

/** *********Redirects************/

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});


/** *********Redirects************/

/** *********Listening to Server************/
server.listen(port, () => {
  console.log(`listening on port ${port} you peasant!!!`);
});

/** *********Listening to Server************/

/** *********Socket.io setup************/

require('./socket')(server, session);

/** *********Socket.io setup************/
