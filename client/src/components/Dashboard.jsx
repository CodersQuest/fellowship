import React, {Component} from 'react';
import GamesList from './GamesList.jsx';
import styles from '../styles/App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import data from './dashBoardDummyData.js';
import { userInfo } from 'os';

// get request on load

// 
class Dashboard extends Component {
  constructor(props) {
    super(props)
    console.log(props);
    this.createNewGame = this.createNewGame.bind(this);
  }
  
  // componentDidMount method to retrive game data
  componentDidMount() {
        
  }

  createNewGame() {
    // user can only be a part of a max of 5 games
    // chck the users games array
    // route to the boardview

    // check gamesPartOf array length < 5
    if(user.gamesPartof.length <= 5) {
      // if yes redirect to new game
      
    }
    // else do nothing
  }
  
  render () {
    console.log(data);
    return (
      <div className="dashBoard">
      <h1> Dashboard </h1>
        <button type="submit" onClick={() => this.createNewGame}>
          New Game
        </button>
        <GamesList games={data} />
      </div>
    );
  }
  
};

export default Dashboard;
//
