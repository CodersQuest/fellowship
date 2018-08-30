import React from 'react';
import {ability, damage, initiative, magic, melee, ranged, skill, saving} from '../images/logIcons/logIcons.js';
const parseTime = (date) => {
  let rightNow = Date.now();
  let milliTime = (rightNow - date) / 1000;
  if (milliTime < 5) {
    return 'a few moments ago';
  } else if (milliTime < 60 && milliTime >= 5) {
    return Math.floor(milliTime) + ' seconds ago';
  } else if (milliTime > 60 && milliTime < 120) {
    return Math.floor(milliTime / 60) + ' minute ago';
  } else if (milliTime >= 120) {
    return Math.floor(milliTime / 60) + ' minutes ago';
  }
}

const battleIcons = {
  'Ranged Attack': {
    text: 'ranged attack',
    url: ranged,
  },
  'Melee Attack': {
    text: 'melee attack',
    url: melee,
  },
  'Spell Attack': {
    text: 'magic attack',
    url: magic,
  },
  'Damage': {
    text: 'damage',
    url: damage,
  },
  'Skill Check': {
    text: 'skill check',
    url: skill,
  },
  'Ability Check': {
    text: 'ability check',
    url: ability,
  },
  'Initiative': {
    text: 'initiative',
    url: initiative,
  },
  'Saving Throw': {
    text: 'saving throw',
    url: saving,
  },
};

const renderIcon = (iconType) => {
  const iconStyle = {
    width: 30,
    height: 30,
  };
  if (battleIcons[iconType]) {
    return (
      <span className='logIcons'>
        <img src={battleIcons[iconType].url} style={iconStyle}/>
        <div>{battleIcons[iconType].text}</div>
      </span>
    );
  }
};

const BattleLogEntry = ({logentry,}) => {
  return logentry.type ?
  (<li className='logentry'>
    <div className='player'>{logentry.username} : </div>
    {logentry.message}
  </li>) :
  (<li className='logentry'>
    <div className="player">{logentry.player} : </div>
    Rolled <span className='rollSize'>{logentry.roll}</span> out of <span className='rollSize'>{logentry.max}</span>
    {logentry.bonus === 0 ? null : ' with a + '}
    <span className='rollSize'>{logentry.bonus === 0 ? null : logentry.bonus}</span>
    {logentry.context === 'none' ? null : ' for  '}
    {logentry.context === 'none' ? null : renderIcon(logentry.context)}
  </li>);
};


export default BattleLogEntry;
