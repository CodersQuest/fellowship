import React, {Component} from 'react';
import axios from 'axios';
import GamesList from './GamesList.jsx';
import styles from '../styles/App.css'
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
      createdGameImg: '',
      userGamesData:[],
      userObject: null,
    }
    console.log(props);
    this.createNewGame = this.createNewGame.bind(this);
    this.initUserSocket = this.initUserSocket.bind(this);
    this.deleteUserGame = this.deleteUserGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateGameName = this.validateGameName.bind(this);
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps, this.props)

  //     this.setState({
  //       isAuth: nextProps.loggedIn
  //     })
    
  // }

  componentDidMount () {
    axios.get('/me').then(res=> {
      this.setState({userObject: res.data.user})
      console.log(res.data.user, 'res from /me')
    }).catch(error => {
      window.location.href='/login'
    })
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
  createNewGame(gameName, gameDescription, gameImage) {
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
        userObject: newUser
      })

      // 
      
    } else {
      // notifiy user that they have reached max allowed games
    }
  }
  

  
  
  render () {
    const { createdGame, createdGameDesc, createdGameImg } = this.state;
    const ShowUserGameOption = () => {
      return (
        <div className="player-options">
        <form>
        {/* <p onClick={()=> this.props.viewChange('/logout')}><Redirect to ="/login">Logout</Redirect></p> */}

          <div className="input-wrapper">
            <label>Enter Game Name:</label>
            <input type="text"
              name = "game-name"
              value = {createdGame}
              onChange = {(e) => { this.handleChange(e, 'createdGame') }}
            />
          </div>
          <div className="input-wrapper">
            <label>Enter Game description:</label>
            <textarea
              name = "game-description"
              value = {createdGameDesc}
              onChange = {(e) => { this.handleChange(e, 'createdGameDesc') }}
            />
          </div>
          <button type="submit" onSubmit={() => {this.createNewGame(param1, param2, param3)}}></button>
        </form>
      </div>
      )
    }
    if (this.props.currentState.loggedIn) {
      return (
        <div className="dashBoard">
          <h1> Dashboard </h1>
            <ShowUserGameOption />
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
