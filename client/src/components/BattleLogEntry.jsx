import React from 'react';
import styles from '../styles/App.css';

const BattleLogEntry = ({handleDisplayLog, logentry }) => {
  
  return (
    <li className='logentry'>{logentry}</li>
  )
};

export default BattleLogEntry;