import React, { Component, Fragment } from 'react';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
import { diceRoll, addToken, removeToken, moveToken } from '../socketClient.js';
import TokenTemplateList from './TokenTemplateList.jsx';
import {eevee, ninetails, clefairy, lugia} from '../templateImages/tokenData.js';
 
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
  
  componentDidMount() {

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