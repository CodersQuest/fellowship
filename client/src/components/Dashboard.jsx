import React, {Component} from 'react';
import GamesList from './GamesList.jsx';
import styles from '../styles/App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import data from './dashBoardDummyData.js';
import users from './userData';

// get request on load

// 
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: props.username,
      isAuth: props.loggedIn,
      createdGame: '',
      createdGameDesc: '',
      createdGameImg: '',
      userGamesData:[]
    }
    console.log(props);
    this.createNewGame = this.createNewGame.bind(this);
    this.initUserSocket = this.initUserSocket.bind(this);
    this.deleteUserGame = this.deleteUserGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateGameName = this.validateGameName.bind(this);
  }

  handleChange(e, attr) {
    this.setState({
      [attr]: e.target.value
    });
  }

  validateGameName(gameName) {
    //check DB to find out if gameName exist

    // return boolean
  }

  initUserSocket() {
    const socket = openSocket('http://localhost:3000');
  }
  
  deleteUserGame(gameName) {
    //remove game from Dashboard View
  
    //post updates to server for user to update 'gamesOwned'
     // 'currentGames', 'gamesPartOf' on user object
    // post updates to server for Game Object if this user is 
      // game Owner
  }
  
  // createNewGame allows a user to create a brand new game room 
  // Gets called and receives 'game name' value from input
  // Must check against maxAllowedGames = 5
  // If 'game name' is unique then creates a new game room using 
  // unique 'game name' as its identifier
  /**
  * 
  * @param {Object} player represents logged in player passed to
  * 'Dashboard' as Prop
  */
  createNewGame(player) {
    // user can only be a part of a max of 5 games
    // chck the users games array
    // route to the boardview
  
    // check gamesPartOf array length < 5
    if(user.gamesPartof.length <= 5) {
      // if yes redirect to new game
      
    } else {
      // notifiy user that they have reached max allowed games
    }
  }
  

  
  
  render () {
    const { authUser, isAuth, createdGame } = this.state;
    const showUserGameOption = () => {
      <div className="player-options">
        <form>
          <div className="input-wrapper">
            <label>Enter Game Name:</label>
            <input type="text"
              name = "game-name"
              value = {createdGame}
              onChange = {(e) => { this.handleChange(e, 'createdGame') }}
            />
          </div>
          <div className="input-wrapper">
            <label>Enter Game Name:</label>
            <input type="text"
              name = "game-description"
              value = {createdGameDesc}
              onChange = {(e) => { this.handleChange(e, 'createdGameDesc') }}
            />
          </div>
        </form>
      </div>
    }
    if (isAuth) {
      return (
        <div className="dashBoard">
          <h1> Dashboard </h1>
            <showUserGameOption></showUserGameOption>
            <GamesList games={data} />
          </div>
      )
    } else {
      return 'User not authenticated';
    }

  }
  
};

export default Dashboard;
//
