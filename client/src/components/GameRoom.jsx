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
  sendMessage,
  playerConnect,
  socket,
  handleTokens,
  deleteTokens
} from '../socketClient.js';
import TokenTemplateList from './TokenTemplateList.jsx';
import {players, enemies} from '../images/QiPTokens/tokenimages.js';
// import {eevee, ninetails, clefairy, lugia} from '../images/imageData.js';

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
      // tokenImages: [eevee, ninetails, clefairy, lugia],
      tokenImages: [players,enemies],
      clearTokens: false,
    };
    this.rollDice = this.rollDice.bind(this);
    this.onClear = this.onClear.bind(this);
    this.handleLeaveGame = this.handleLeaveGame.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.updateTokens = this.updateTokens.bind(this);
  }
/**
 * React standard mount.
 * Initializes all socket event listeners for game setup.
 */
  componentDidMount() {
    if (this.props.currentGame) {
      playerConnect(this.props.currentUser);
      socket.on('newPlayer', (data) => {
        joinGame(this.props.currentGame);
      });
      socket.on('gameStatusUpdated', (gameData) => {
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
      socket.on('updateToken', (tokensData) => {
        this.setState({
          tokens: tokensData,
        });
      });
    }
  }

  componentWillUnmount() {
    socket.disconnect();
  }
/**
 * makes a random dice roll inclusive to the max.
 * sends data from roll and player in socket emit.
 * @param {int} value Number representing specific die clicked.
 */
  rollDice(value, rollBonus, rollContext) {
    const roll = Math.floor(Math.random() * (value - 1 + 1) + 1);
    const user = this.props.currentUser.username;
    // ! TODO: Add roll context to this later. As well as Bonus modifier.
    diceRoll({
      player: user,
      roll: roll,
      bonus: rollBonus,
      context: rollContext,
      max: value,
    });
  }
  /**
   * @param {string} message string from GameChat.
   */
  sendChat(message) {
    let date = Date.now();
    let msg = {
      username: this.props.currentUser.username,
      type: 'message',
      message: message,
      timestamp: date,
    }
    sendMessage(msg);
  }
/**
 * Function to Run through click handler for leaving games.
 * No params needed. Will fire socket leaveGame event.
 */
  handleLeaveGame() {
    leaveGame();
    // !need to pass down a method to reset
    // !currentGame obj to empty.
  }
/**
 * Clears Fabric Canvas.
 */
  onClear() {
    const c = document.getElementById('canvas').fabric;
    c.getObjects().map((obj) => {
      if (obj.type !== 'line') {
        c.remove(obj);
      }
    });
    c.renderAll.bind(c);
    var json = c.toJSON()
    var array = [].push(json)
    console.log(json, 'from onclear')
    this.setState({ tokens: array})
    // !function to emit socket event. Expects an array argument.
    deleteTokens(array);
  }
/**
 * Update / Add to tokens array.
 * @param {object} token from BattleMap
 */
  updateTokens(token) {
    const tokens = [];
    const c = document.getElementById('canvas').fabric;
    var json  = c.toJSON()
    tokens.push(json)
    this.setState({ tokens: tokens})//this is needed to have prev props in child battlemap component
    // !function to emit socket event. Expects an array argument.
    handleTokens(tokens);
  }
/**
 * React Render
 * @return {renderdom} renders conditional component dependant on router.
 */
  render() {
    const isLoggedIn = this.props.isLoggedIn;

    if (!isLoggedIn) {
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

    if (isLoggedIn) {
      return (
        <Fragment>
          <div id="gameContainer">
            <div className="upperLeft"></div>
            <TokenTemplateList
            onClear={this.onClear}
            tokenImages={this.state.tokenImages} />
            <BattleMap update={this.updateTokens} onClear={this.onClear} tokens={this.state.tokens}/>
            <BattleLog currentLog={this.state.log} {...this.props} />
            <GameProfiles players={this.state.players} />
            <GameOptions leaveGame={this.handleLeaveGame} game={this.props.currentGame} />
            <div className="lowerLeft"></div>
            <DiceTray rollDice={this.rollDice} />
            <GameChat sendChat={this.sendChat} />
          </div>
        </Fragment>
      );
    } else {
      console.log('GameRoom else statment', isLoggedIn);
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
