import React from 'react';
import styles from '../styles/App.css';

const BattleLogEntry = ({handleDisplayLog, logentry }) => {
  
  return (
    <li className='logentry'>{logentry.player} rolled a {logentry.roll} out of {logentry.max}</li>
  )
};

export default BattleLogEntry;