import React from 'react';

const GameOptions = ({leaveGame, game,}) => {
  return (
    <div id="settings">
      <div className="optionsGameName">{game.gameName}</div>
      <button onClick={leaveGame} className="button is-primary is-inverted is-outlined">LEAVE GAME</button>
    </div>
  );
};

export default GameOptions;
