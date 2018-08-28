import React from 'react';
import styles from '../styles/App.css';
const listItemStyle = {
  width: 75,
  height: 75,
};

const GamesListItem = ({game, joinGame, history, }) => {
  return (
    <div>
      <div className="gameListItem">
          <div className="icon">
            <figure className="gameImage">
              <img style={listItemStyle}
              src={game.gameImg}/>
            </figure>
          </div>
            <div className="info">
              <p>
                <span className="gameName is-size-5 has-text-weight-bold">
                  {game.gameName}
                </span>

              </p>
              <div className="gameId is-size-5">
                {game.gameId}
              </div>
              <span className="gameDescription is-size-5">
                {game.gameDesc}
              </span>
            </div>


            <div id="joinButton">
              {/* <Link to={`/games/${game.gameId}`}>Join Game</Link> */}
              <button type='button'
                onClick={() => {
                  joinGame(game);
                  history.push(`/games/${game.gameId}`);
                }}>
                  <a className="button is-small is-info">
                    Join Game
                  </a>
              </button>
            </div>

      </div>
    </div>
  );
};

export default GamesListItem;
