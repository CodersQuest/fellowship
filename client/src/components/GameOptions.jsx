import React from 'react';

// Component for options menu including Leaving the Game.
class GameOptions extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="settings"> 
        <h1 className="is-primary is-inverted is-outlined">GAME TITLE</h1>
        <button className="button is-primary is-inverted is-outlined">LEAVE GAME</button>
      </div>
    )
  }
}

export default GameOptions;