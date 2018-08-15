import React from 'react';

var style = {
  width: 100,
  height: 100,
  padding: 5
}
const Dice = (props) => (
  <div>
    <img src={props.image} style={style}/>
    <h5>{props.name}</h5>
  </div>
)

export default Dice;