import React, {Component} from 'react';
import axios from 'axios';
import GamesList from './GamesList.jsx';
import styles from '../styles/App.css';
import { defaultGameImage } from '../images/imageData';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import data from './dashBoardDummyData.js';
import users from './userData';
import { PromiseProvider } from 'mongoose';

// get request on load

// 
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createdGame: '',
      createdGameDesc: '',
      createdGameImg: defaultGameImage,
      createdGameId: 0,
      userGamesData:[],
    }
    console.log(this.props);
    this.createNewGame = this.createNewGame.bind(this);
    this.initUserSocket = this.initUserSocket.bind(this);
    this.deleteUserGame = this.deleteUserGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateGameName = this.validateGameName.bind(this);
    // this.joinGame = this.joinGame.bind(this);

  }

  componentDidMount () {
    
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
  createNewGame() {
    
    // user can only be a part of a max of 5 games
    // chck the users games array
    // route to the boardview
  
    // check gamesPartOf array length < 5
    if(this.state.userObject.gamesPartof.length <= 5) {
      // make a call to userUpdate endpoint to push game data to user collection

      // make modifications to UI from state
      const newUser = Object.assign(
        {},
        this.state.userObject
      );
      newUser.gamesPartof = this.state.userObject.gamesPartof.concat([
        {
          gameName: gameName,
          gameUrl: '/foo', ///gameUrl,
          gameDescription: gameDescription,
          gameImage: gameImage,

        }
      ])

      this.setState({
        userObject: newUser,

      })

      
    } else {
      // notifiy user that they have reached max allowed games
    }
  }

  
  
  render () {
    const { createdGame, createdGameDesc, createdGameImg, viewChange } = this.state;
    console.log(this.props);

    if(!this.props.isLoggedIn) return <Redirect to="/login" />;
    
    const ShowNavbar = () => {
      return (
          <nav className="navbar is-transparent is-success" role="navigation" aria-label="main navigation">

            <div className="navbar-brand">
              <a className="navbar-brand is-size-1 has-text-white" href="#"> Dashboard </a>
            </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="field is-grouped">
                    <p className="control" onClick={()=> this.props.viewChange('/logout')}>
                      <a className="button is-link">
                        Logout
                      </a>
                    </p>
                    <p onClick={()=> this.props.viewChange('/game')}>
                      <a className="button is-link">
                        Go To Game Page
                      </a>
                    </p>
                  </div>
                </div>
              </div>
          </nav>
      )
    };
    const ShowUserGameOption = () => {
      return (
      <div>
        <div className="player-options">
          <form>
            <div className="input-wrapper is-size-4">
              <label>Enter Game Name:</label>
              <input type="text"
                className="input"
                placeholder="game name"
                name = "game-name"
                value = {createdGame}
                onChange = {(e) => { this.handleChange(e, 'createdGame') }}
              />
            </div>
            <div className="input-wrapper is-size-4">
              <label>Enter Game description:</label>
              <textarea
                className="textarea"
                placeholder="game description"
                rows="10"
                name = "game-description"
                value = {createdGameDesc}
                onChange = {(e) => { this.handleChange(e, 'createdGameDesc') }}
              />
            </div>
            <button type="button" onClick={this.createNewGame}>
              <a className="button">
                Create New Game
              </a>
            </button>
            {/* <button type="submit" onClick={() => viewChange('/game')}>Click To Game</button> */}
          </form>
        </div>
      </div>
      )
    }
    
    return (
      <div className="dashBoard">
        <ShowNavbar />

        <div className="columns is-desktop">

          <div className="column is-two-thirds">
            <GamesList
              games={data}
              joinGame={this.joinGame}
            />

          </div>
          <div className="column is-one-third">
            <ShowUserGameOption />

          </div>
        </div> 

      </div>
    )
    

  }
  
};

export default Dashboard;
//