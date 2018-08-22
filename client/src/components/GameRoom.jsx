import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
import { diceRoll, addToken, removeToken, moveToken, playerConnect } from '../socketClient.js';
import TokenTemplateList from './TokenTemplateList.jsx';
import {eevee, ninetails, clefairy, lugia} from '../images/imageData.js';
import gamesList from './dashBoardDummyData.js';
 
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: [],
      tokenImages: [eevee, ninetails, clefairy, lugia]
    }
    this.rollDice = this.rollDice.bind(this);
  }
  componentWillMount() {
    this.getGameData(this.props.match.params.gameId);
  }
  componentDidMount() {
    console.log(this.props.currentUser);
    playerConnect(this.props.currentUser);
  }

  getGameData(gameId) {
    const currentGame = gamesList.find((game) => {
      return game.gameId === gameId;
    })
    this.setState({ currentGame })
    //console.log(game, gameId);
  }

  rollDice(value) {
    // capture the dice clicked's value
    // roll the die and turn to string
    // should also have user info and eventually context
    // may want to consider also handling multiple rolls
    // after message is ready, pass to diceRoll function for socket event
    console.log(value);
  }
  
  render() {
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
    

    return (
      <Fragment>
        <div id="gameContainer">
          <TokenTemplateList tokenImages={this.state.tokenImages}/>
          <BattleMap />   

          <BattleLog />
          <GameProfiles />
          <GameOptions />
          <DiceTray rollDice={this.rollDice}/>
        </div>
      </Fragment>
    )
  }
}

export default GameRoom;