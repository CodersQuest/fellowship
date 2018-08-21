import React from 'react';

// Component for options menu including Leaving the Game.
class GameOptions extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="settings"> 
        <h1>GAME TITLE</h1>
        <h1>LEAVE GAME</h1>
      </div>
    )
  }
}

export default GameOptions;