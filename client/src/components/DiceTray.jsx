import React from 'react';
import Dice from './Dice.jsx';
import DiceBonus from './DiceBonus.jsx';
import DiceContext from './DiceContext.jsx';

const dice = [{
  name: 'd4',
  value: 4,
  image: 'https://i.imgur.com/K4N1Nst.png',
}, {
  name: 'd6',
  value: 6,
  image: 'https://i.imgur.com/xYyGhTN.png',
}, {
  name: 'd8',
  value: 8,
  image: 'https://i.imgur.com/KWuYTPl.png',
}, {
  name: 'd10',
  value: 10,
  image: 'https://i.imgur.com/VvDB1d8.png',
}, {
  name: 'd12',
  value: 12,
  image: 'https://i.imgur.com/7tDipCu.png',
}, {
  name: 'd20',
  value: 20,
  image: 'https://i.imgur.com/V9GA3mT.png',
}];

// Dice Tray. Will likely expect an array of dice, tracking name and image.
// Will also pass down click events to each dice component.
// Utilize Flexbox for styling this container.
class DiceTray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bonus: 0,
      context: 'none',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div id="diceTray">
        <div className='bonusModify'>
          <div>Bonus Modifier</div>
          <DiceBonus handleChange={this.handleChange} bonus={this.state.bonus} />
        </div>
        <div className='rollContext'>
          <div>Roll Context</div>
          <DiceContext handleChange={this.handleChange} context={this.state.context} />
        </div>
        {dice.map((die) => (
          <Dice
            name={die.name}
            image={die.image}
            key={die.name}
            value={die.value}
            rollDice={this.props.rollDice}
            bonus={this.state.bonus}
            context={this.state.context}
          />
        ))}
      </div>
    );
  }
}

export default DiceTray;
