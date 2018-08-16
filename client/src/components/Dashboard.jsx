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
      newGameValue: '',
      joinGameValue: '',
      socketId: ''
      
    };
    console.log(props);
    this.createNewGame = this.createNewGame.bind(this);
    this.initUserSocket = this.initUserSocket.bind(this);
    this.deleteUserGame = this.deleteUserGame.bind(this);
  }

  // joinCurrentGame() {
    
  // }
  
  
  
  render () {
    return (
      <div className="dashBoard">
      <h1> Dashboard </h1>
        <div className="player-options">
          {/* <div className="join-game">
            <form>
              <label>Enter Game Name:</label>
              <input
                type="text" name="game-name" />
            </form>
            <button
              type="submit"
              onClick={() => this.joinCurrentGame}

              >Join Game
            </button>
          </div> */}

        <button type="submit" onClick={() => this.createNewGame}>
          New Game
        </button>
        </div>
        <GamesList games={data} />
      </div>
    );
  }
  
};

export default Dashboard;
//
