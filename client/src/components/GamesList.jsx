import React from 'react';
import GamesListItem from './GamesListItem.jsx';
import styles from '../styles/App.css'

const GamesList = ({games, joinGame}) => {
  return (
    <div className="gamesList">
<<<<<<< HEAD
     {games.map(function (game) {
       return (
        <GamesListItem
          key={game.gameName}
          game = { game }
          joinGame={joinGame}
        />
       )
     }) 
     }
=======
     {games.map((game) => (
      <GamesListItem game={game} key={game.gameName} joinGame={joinGame} />
     ))}
>>>>>>> I don't have a good commit for this
    </div>
  );
};

export default GamesList;
