import React from 'react';

const GameOptions = ({leaveGame, game,}) => {
  return (
    <div id="settings">
      <h1 className="is-primary is-inverted is-outlined">{game.gameName}</h1>
      <button onClick={leaveGame} className="button is-primary is-inverted is-outlined">LEAVE GAME</button>
    </div>
  );
};

export default GameOptions;
