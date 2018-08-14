import React from 'react';

const GamesListItem = ({game}) => {
  // Image of game
  // game name
  // description of game
  //
  return (
    <div>
      <ul>
        <li>
          <div className="gameName">
            {game.gameName}
          </div>
          <div className="gameDescription">
            {game.description}
          </div>
          <div className="gameImage">
            <img src={game.imageUrL}/>
          </div>
        </li>
      </ul>
    </div>
  )
};

export default GamesListItem;
