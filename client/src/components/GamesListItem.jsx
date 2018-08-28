import React from 'react';
import styles from '../styles/App.css';
const listItemStyle = {
  width: 75,
  height: 75,
};

const GamesListItem = ({game, joinGame, history, }) => {
  return (
      <div className="gameListItem">

        <div id="icon">
          <figure id="gameImage">
            <img style={listItemStyle}
            src={game.gameImg}/>
          </figure>
        </div>

        <div className="gameElements">
          <div id="gameName">
            {game.gameName}
          </div>

          <div id="gameId">
            {game.gameId}
          </div>

          <div id="gameDesc">
            {game.gameDesc}
          </div>
        </div>


        <div id="joinButton">
          {/* <Link to={`/games/${game.gameId}`}>Join Game</Link> */}
          <button type='button'
            onClick={() => {
              joinGame(game);
              history.push(`/games/${game.gameId}`);
            }}>
              <a className="button">
                Join Game
              </a>
          </button>
        </div>

      </div>
  );
};

export default GamesListItem;
