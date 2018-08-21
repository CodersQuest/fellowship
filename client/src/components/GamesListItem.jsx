import React from 'react';
import styles from '../styles/App.css'
const listItemStyle = {
  width: 75,
  height: 75
}
const GamesListItem = ({game, joinGame}) => {

  return (
    <div>
      <ul>
        <li>
          <div className="box">
            <div className="container">
              <span className="gameImage">
                <img style={listItemStyle}
                src={game.gameImg}/>
              </span>
              <span className="gameName">
                {game.gameName}
              </span>
              <span className="gameId">
                {game.gameId}
              </span>
              <span className="gameDescription">
                {game.gameDesc}
              </span>
              <span><button type='button'
                onClick={() => joinGame(game)}
              >Join Game</button>
              </span>
            </div>
          </div>


        </li>
      </ul>
    </div>
  )
};

export default GamesListItem;
