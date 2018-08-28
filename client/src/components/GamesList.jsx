import React from 'react';
import GamesListItem from './GamesListItem.jsx';
import styles from '../styles/App.css';

const GamesList = ({games, joinGame, history, }) => {
  return games.map((game) => {
    return (
    <GamesListItem
      key={game.gameName}
      game = { game }
      joinGame={joinGame}
      history={history}
    />
    );
  });
};

export default GamesList;
