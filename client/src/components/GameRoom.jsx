import React, { Component, Fragment } from 'react';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
import { updateBattleLog } from '../socketClient.js';

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: [],
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