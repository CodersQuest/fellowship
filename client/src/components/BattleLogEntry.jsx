import React from 'react';
import styles from '../styles/App.css';

const BattleLogEntry = ({handleDisplayLog}) => {
  return (
    <div className='li-holder'>
      {handleDisplayLog}
    </div>
  )
};

export default BattleLogEntry;