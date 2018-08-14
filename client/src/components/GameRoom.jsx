import React, { Component, Fragment } from 'react';

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
          <div>GAME SPACE</div>
        </div>
      </Fragment>
    )
  }
}

export default GameRoom;