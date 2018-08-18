import React, { Component, Fragment } from 'react';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
<<<<<<< HEAD
import { updateBattleLog } from '../socketClient.js';
=======
import TokenTemplateList from './TokenTemplateList.jsx';
import {eevee, ninetails, clefairy, lugia} from '../templateImages/tokenData.js';
>>>>>>> create draggable static image tokens and tokenlist and tokenlistitem in react

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
    this.updateBattleLog = updateBattleLog.bind(this);
  }
  
  componentDidMount() {
    this.updateBattleLog();
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
          <DiceTray />
        </div>
      </Fragment>
    )
  }
}

export default GameRoom;