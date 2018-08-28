import React from 'react';
import {defaultGameImage} from '../images/imageData';

/**
 * Form for Creating a NEW Game
 * @param {func} handleChange function for input
 * @return {object} which is containing state
 * gameName, gameDescription and gameImage
 */
class CreateGameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameName: '',
      gameDescription: '',
      gameImage: defaultGameImage,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;

    // console.log(target);
    this.setState({
      [name]: value,
    });
  }

  render() {
    const createGame = this.props.createGame;
    return (
      <div className='create-game-form'>
        <form onSubmit={createGame}>
          <div className='gamename-input'>
            <label>Game Name:</label>
            <input className=''
              type='text'
              name='gameName'
              onChange={this.handleInputChange}
            />
          </div>
          <div className='gamedescription-input'>
            <label>Game Name:</label>
            <input className=''
              type='text'
              name='gameDescription'
              onChange={this.handleInputChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateGameForm;
