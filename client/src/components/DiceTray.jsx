import React from 'react';
import Dice from './Dice.jsx';

const dice = [{
  name:'d4',
  image: 'https://i.imgur.com/K4N1Nst.png'
}, {
  name:'d6',
  image: 'https://i.imgur.com/xYyGhTN.png'
}, {
  name:'d8',
  image: 'https://i.imgur.com/KWuYTPl.png'
},{
  name:'d10',
  image: 'https://i.imgur.com/VvDB1d8.png'
},{
  name:'d12',
  image: 'https://i.imgur.com/7tDipCu.png'
},{
  name:'d20',
  image: 'https://i.imgur.com/V9GA3mT.png'
}];

// Dice Tray. Will likely expect an array of dice, tracking name and image.
// Will also pass down click events to each dice component.
// Utilize Flexbox for styling this container.

const DiceTray = (props) => (
  <div id="diceTray">
    {dice.map((die) => (
      <Dice name={die.name} image={die.image} key={die.name} />
    ))}
  </div>
)

export default DiceTray;