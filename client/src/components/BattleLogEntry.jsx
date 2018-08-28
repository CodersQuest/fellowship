import React from 'react';
import styles from '../styles/App.css';

const BattleLogEntry = ({logentry,}) => {
  return logentry.type ? 
  (<li className='logentry'>{logentry.username}  {logentry.timestamp}: {logentry.message}</li>) :
  (<li className='logentry'>{logentry.player} : rolled a {logentry.roll} out of {logentry.max}</li>)
};


export default BattleLogEntry;
