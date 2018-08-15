import React from 'react';
import styles from '../styles/App.css'

const GamesListItem = ({game}) => {

  return (
    <div>
      <ul>
        <li>
        <div className="wrapper">
          <div className="gameImage">
            <img src={game.imageUrL}/>
          </div>
          <div className="nested">
            <div className="gameName">
              {game.gameName}
            </div>
            <div className="gameDescription">
              {game.description}
            </div>
          </div>
        </div>
        </li>
      </ul>
    </div>
  )
};

export default GamesListItem;
