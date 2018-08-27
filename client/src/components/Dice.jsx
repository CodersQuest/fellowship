import React from 'react';

let style = {
  width: 100,
  height: 100,
  padding: 5,
  cursor: 'pointer',
};
const Dice = (props) => (
  <div id="dieRoller">
    <img src={props.image} style={style} onClick={() => props.rollDice(props.value)}/>
  </div>
);

export default Dice;
//
