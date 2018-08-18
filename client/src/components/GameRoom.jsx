import React, { Component, Fragment } from 'react';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";

class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: [],
    }
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