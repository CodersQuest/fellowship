import React from 'react';
import styles from '../styles/App.css';
import {withRouter} from 'react-router-dom';
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
                joinGame(game);
                // <Redirect to={`/games/${game.gameUrl}`} />;
                history.push(`/games/${game.gameUrl}`);
              }}>
              Join Game
            </button>
          </div>
      </div>
  );
};

export default withRouter(GamesListItem);
