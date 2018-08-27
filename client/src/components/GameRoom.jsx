import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import BattleMap from './BattleMap.jsx';
import BattleLog from './BattleLog.jsx';
import GameProfiles from './GameProfiles.jsx';
import GameOptions from './GameOptions.jsx';
import DiceTray from './DiceTray.jsx';
import GameChat from './GameChat.jsx';
import {
  joinGame,
  leaveGame,
  diceRoll,
  addToken,
  removeToken,
  moveToken,
  playerConnect,
  socket
} from '../socketClient.js';
import TokenTemplateList from './TokenTemplateList.jsx';
import {eevee, ninetails, clefairy, lugia} from '../images/imageData.js';
/**
 * Adds two numbers together.
 * @param {int} num1 The first number.
 * @param {int} num2 The second number.
 */
class GameRoom extends Component {
  /**
 * Props from App.
 * @param {object} props object containing methods and state from app.
 */
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: [],
      tokenImages: [eevee, ninetails, clefairy, lugia],
      clearTokens: false,
    };
    this.rollDice = this.rollDice.bind(this);
    this.onClear = this.onClear.bind(this);
    this.handleLeaveGame = this.handleLeaveGame.bind(this);
  }
/**
 * React standard mount.
 * Initializes all socket event listeners for game setup.
 */
  componentDidMount() {
    playerConnect(this.props.currentUser);
    socket.on('newPlayer', (data) => {
      joinGame(this.props.currentGame);
    });
    socket.on('gameStatusUpdated', (gameData) => {
      // data.logs, data.players, data.tokens
      this.setState({
        players: gameData.players,
        tokens: gameData.tokens,
        log: gameData.logs,
      });
    });
    socket.on('updateLog', (logData) => {
      this.setState({
        log: logData,
      });
    });
    socket.on('playerLeft', (playerData) => {
      this.setState({
        players: playerData,
      });
    });
  }
/**
 * makes a random dice roll inclusive to the max.
 * sends data from roll and player in socket emit.
 * @param {int} value Number representing specific die clicked.
 */
  rollDice(value) {
    const roll = Math.floor(Math.random() * (value - 1 + 1) + 1);
    const user = this.props.currentUser.username;
    // ! TODO: Add roll context to this later. As well as Bonus modifier.
    diceRoll({
      player: user,
      roll: roll,
      max: value,
    });
  }
/**
 * Function to Run through click handler for leaving games.
 * No params needed. Will fire socket leaveGame event.
 */
  handleLeaveGame() {
    leaveGame();
  }
/**
 * Clears Fabric Canvas.
 */
  onClear() {
    const c = document.getElementById('canvas').fabric;
    c.getObjects().map((obj) => {
      if (obj.selectable === true) {
        c.remove(obj);
      }
    });
    c.renderAll.bind(c);
  }
/**
 * React Render
 * @return {renderdom} renders conditional component dependant on router.
 */
  render() {
    const isLoggedIn = this.props.isLoggedIn;

    if (this.props.currentUser === null) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: {
              from: this.props.location.pathname,
            },
          }}
        />
      );
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
            <GameChat />
          </div>
        </Fragment>
      );
    } else {
      return (
        <Redirect
          to={{
            pathname: '/',
            state: {
              from: this.props.location.pathname,
            },
          }}
        />
      );
    }
  }
}

export default GameRoom;
