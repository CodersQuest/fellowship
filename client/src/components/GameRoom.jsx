import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
import { joinGame, leaveGame, diceRoll, addToken, removeToken, moveToken, playerConnect, socket } from '../socketClient.js';
import TokenTemplateList from './TokenTemplateList.jsx';
import {eevee, ninetails, clefairy, lugia, defaultGameAvatar} from '../images/imageData.js';
 
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: [],
      tokenImages: [eevee, ninetails, clefairy, lugia],
      clearTokens: false
    }
    this.rollDice = this.rollDice.bind(this);
    this.onClear = this.onClear.bind(this);
    this.handleLeaveGame = this.handleLeaveGame.bind(this);
  }
  

  componentDidMount() {
    playerConnect(this.props.currentUser);
    socket.on('newPlayer', data => {
      joinGame(this.props.currentGame);
    });
    socket.on('gameStatusUpdated', gameData => {
      // data.logs, data.players, data.tokens 
      this.setState({
        players: gameData.players,
        tokens: gameData.tokens,
        log: gameData.logs
      });
    });
    socket.on('updateLog', logData => {
      this.setState({
        log: logData
      });
    });
    socket.on('playerLeft', playerData => {
      this.setState({
        players: playerData
      });
    });
  }

  rollDice(value) {
    const roll = Math.floor(Math.random() * (value - 1 + 1) + 1);
    const user = this.props.currentUser.username;
    //! TODO: Add roll context to this later. As well as Bonus modifier.
    diceRoll({
      player: user,
      roll: roll,
      max: value
    });
  }

  handleLeaveGame() {
    leaveGame();
  }

  onClear () {
    var c = document.getElementById('canvas').fabric;
    c.getObjects().map(obj => {
      if (obj.selectable === true) {
        c.remove(obj)
      }
    });
    c.renderAll.bind(c);
  }
  
  render() {
    const isLoggedIn = this.props.isLoggedIn;
    
    if (this.props.currentUser === null)  {
      return (
        <Redirect 
          to={{
            pathname: "/login",
            state: {
              from: this.props.location.pathname
            }
          }}
        />
      )
    }

    if ( isLoggedIn && (this.props.currentGame).hasOwnProperty('gameId') ) {  
      return (
        <Fragment>
          <div id="gameContainer">
            <TokenTemplateList 
            onClear={this.onClear} 
            tokenImages={this.state.tokenImages} />
            <BattleMap clearTokens={this.state.clearTokens} />   
            <BattleLog currentLog={this.state.log} {...this.props} />
            <GameProfiles players={this.state.players} />
            <GameOptions leaveGame={this.handleLeaveGame} game={this.props.currentGame} />
            <DiceTray rollDice={this.rollDice} />
          </div>
        </Fragment>
      )
    } else {
      return (
        <Redirect 
          to={{
            pathname: "/",
            state: {
              from: this.props.location.pathname
            }
          }}
        />
      )
    }
  } // end render()
}

export default GameRoom;