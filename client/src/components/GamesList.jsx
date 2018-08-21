import React from 'react';
import GamesListItem from './GamesListItem.jsx';
import styles from '../styles/App.css'

const GamesList = ({games, joinGame}) => {
  return (
    <div className="gamesList">
     {games.map(function (game) {
       return (
        <GamesListItem
<<<<<<< HEAD
          key={game.gameName}
=======
          key={game.gameName} 
>>>>>>> fixed minor thing
          game = { game }
          joinGame={joinGame}
        />
       )
     }) 
     }
    </div>
  );
};

export default GamesList;
