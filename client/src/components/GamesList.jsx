import React from 'react';
import GamesListItem from './GamesListItem.jsx';
import styles from '../styles/App.css'

const GamesList = ({games}) => {
  return (
    <div className="gamesList">
     {games.map(function (game) {
       return (
        <GamesListItem 
          game = { game } key = { game._id }
        />
       )
     }) 
     }
    </div>
  );
};

export default GamesList;
