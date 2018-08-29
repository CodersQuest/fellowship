import React from 'react';
import styles from '../styles/App.css';
const listItemStyle = {
  width: 75,
  height: 75,
};

const GamesListItem = ({game, joinGame, history,}) => {
  return (
      <div className="gameListItem">
          <img className="gameImage" src={game.gameImg}/>

          <div className="gameName">
            {game.gameName}
          </div>

          <div className="gameOwner">
            Game Master: {game.gameOwner}
          </div>

          <div className="gameDesc">
            {game.gameDesc}
          </div>
          <div className="gamePlayers">
          Players: {game.players ? game.players.join(', ') : null}
          </div>
          <div className="joinButton">
            <button id="joinButtonSpace" type='button'
              onClick={() => {
                let sanitizedString = game.gameDesc;
                sanitizedString = sanitizedString.replace(/[^A-Z0-9]+/ig, '');
                sanitizedString = sanitizedString.toLowerCase();
                joinGame(game);
                history.push(`/games/${sanitizedString}`);
              }}>
              Join Game
            </button>
          </div>
      </div>
  );
};

export default GamesListItem;
