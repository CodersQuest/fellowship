import React, {Component} from 'react';
// import socket from '../socketClient.js';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import GameRoom from './GameRoom.jsx';
import 'bulma/css/bulma.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          view: '/login',
          username: '',
          password: '',
          email: '',
          loggedIn: false,
          currentUser: null,
          currentGame: {},

      };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.viewChange = this.viewChange.bind(this);
    this.logOut = this.logOut.bind(this);
    this.joinGame = this.joinGame.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.setUser = this.setUser.bind(this);
  }


  handleChange(e) {
    this.setState({
     [e.target.name]: e.target.value,
    });
  }

  viewChange(text) {
    this.setState({
      view: text,
    });
  }

  joinGame(game) {
    console.log(game);
    // update state for currentGame
    this.setState({
      currentGame: game,
    });
    // this.props.history.push(`/games/${game.gameId}`);
    // window.location.href=`/games/:${this.state.currentGame.gameId}`
  }

  // get game data
  getCurrentUser() {
    return (
      axios.get('/me').then((res) => {
        this.setState({
          currentUser: res.data.user,
        });

        console.log(res.data.user, 'res from App.jsx getCurrentUser()');
      }).catch((error) => {
        window.location.href='/login';
      })
    );
  }

  componentDidMount() {
    axios.get('/me').then((res) => {
      if (res.data.user) {
        this.setState({currentUser: res.data.user, loggedIn: true});
      } else {
        this.setState({loggedIn: false});
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
  };

  onSubmit(e) {
    // post request to db on submit button
    const {view, email, username, password} = this.state;
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
      }, () => {
        // this.history.push("/")
        // console.log(this.props);
      });
      // update something here based on response url
      // history.pushState({key: response.data}, null, response.data);
    })
    .catch((error) => {
      throw error;
    });
  }

  render() {
    const {currentUser, currentGame, loggedIn, email, username, password} = this.state;

    // login /
    // signup
    // games/:gameId
    // dashboard /

    // it's wrong to have functions in the render method
    // const renderLanding = () => {
    //   if (view ==='/logout') {
    //     this.logOut();
    //   }

    return (

    <Router>
     <div>

        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-1 is-uppcase has-text-centered">Quest in Progress</h1>
            </div>
          </div>
        </section>

        <Switch>
          {/* <Route path="/dashboard" render={renderDashboard}/> */}
          <Route exact path="/"
            render={(props) => (
              <Dashboard
                // currentState={ this.state }
                isLoggedIn={loggedIn}
                logOut={this.logOut}
                viewChange={this.viewChange}
                joinGame={this.joinGame}
                // getCurrentUser={this.getCurrentUser}
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
              // viewChange={this.viewChange}
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
