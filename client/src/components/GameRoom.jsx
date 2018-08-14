import React, { Component, Fragment } from 'react';
import BattleMap from './BattleMap.jsx';
import BattleLog from "./BattleLog.jsx";
import GameProfiles from "./GameProfiles.jsx";
import GameOptions from "./GameOptions.jsx";
import DiceTray from "./DiceTray.jsx";
//! need to import: BattleLog, GameOptions, GameProfiles, DiceTray

// Will need to utilize CSS Grid to layout all subcomponents
// This component will hold the game state, 
// current players, and many other pieces of information to pass down and update subcomponents.
class GameRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGame: {},
      players: [],
      tokens: [],
      log: []
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