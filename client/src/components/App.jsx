import React, {Component} from 'react';
// import socket from '../socketClient.js';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import GameRoom from './GameRoom.jsx';
import 'bulma/css/bulma.css';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: '',
          email: '',
          loggedIn: false,
          currentUser: null,
          currentGame: {},
      };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
    this.exitGame = this.exitGame.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.updateGamesPartOf = this.updateGamesPartOf.bind(this);
    this.setUser = this.setUser.bind(this);
  }


  handleChange(e) {
    this.setState({
     [e.target.name]: e.target.value,
    });
  }

  // viewChange(text) {
  //   this.setState({
  //     view: text,
  //   });
  // }

  exitGame() {
    let resetGame = Object.assign({}, this.state.currentGame);
    resetGame = {};
    this.setState({
      currentGame: resetGame,
    });
    console.log(this.state);
    return <Redirect to='/' component={Dashboard} />;
  }

  joinGame(game) {
    // console.log(game);
    // update state for currentGame
    this.setState({
      currentGame: game,
    });
  }

  // get game data
  updateGamesPartOf(gameid) {
    const userCopy = Object.assign({}, this.state.currentUser);
    userCopy.gamesPartOf.push(gameid);
    this.setState({
      currentUser: userCopy,
    });
  }

  componentDidMount() {
    axios.get('/me').then((res) => {
      if (res.data.user) {
        this.setState({
          currentUser: res.data.user,
          loggedIn: true,
        });
      } else {
        this.setState({
          loggedIn: false,
        });
      }
      console.log(res.data.user, 'res from checkauth');
    }).catch((error) => {
      console.log(error);
    });
  }

  logOut() {
    axios.get('/logout')
    .then((res) => {
      this.setState({
        loggedIn: false,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  setUser(currentUser, cb = () => {}) {
    this.setState({
      currentUser,
      loggedIn: true,
    }, cb);
  }

  onSubmit(e) {
    // post request to db on submit button
    const {
      view,
      email,
      username,
      password,
    } = this.state;
    e.preventDefault();

    // '/login' or 'signup'
    axios.post(view, {
      username: username,
      password: password,
      email: email,
    })
    .then((response) => {
      console.log(response);
      this.setState({
        currentUser: response.data.user,
        loggedIn: true,
      });
    })
    .catch((error) => {
      throw error;
    });
  }

  render() {
    const {
      currentUser,
      currentGame,
      loggedIn,
      email,
      username,
      password,
    } = this.state;

    // login /
    // signup
    // games/:gameId
    // dashboard /

    return (

    <Router>
     <div>
        <Switch>
          <Route exact path="/"
            render={(props) => (
              <Dashboard
                isLoggedIn={loggedIn}
                logOut={this.logOut}
                viewChange={this.viewChange}
                joinGame={this.joinGame}
                updateGamesPartOf={this.updateGamesPartOf}
                currentUser={currentUser}
                {...props}
              />
            )}
          />
          <Route path="/login"
            render={(props) => (
              <Login
                setUser={this.setUser}
                viewChange={this.viewChange}
                handleChange={this.handleChange}
                goToPath={this.goToPath}
                {...props}
              />
            )}
          />
          <Route path="/signup"
            render={(props) => (
              <SignUp
              onSubmit={this.onSubmit}
              email={email} username={username}
              pw={password}
              handleChange={this.handleChange}
              />
            )}
          />
          <Route path="/games/:gameId"
            render={(props) => (
              <GameRoom
                isLoggedIn={loggedIn}
                logOut={this.logOut}
                exitGame={this.exitGame}
                currentUser={currentUser}
                currentGame={currentGame}
                {...props}
              />
            )}
          />
        </Switch>
      </div>
    </Router>

    );
  }
}
export default App;
