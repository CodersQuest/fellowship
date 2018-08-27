import React from 'react';
/**
 * Text Area For Game Room. Allowing Users to Chat
 */
class GameChat extends React.Component {
  /**
   * @param {object} props passed down from GameRoom
   */
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      charsLeft: 140,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  /**
   * @param {event} event event passed through change in textArea.
   */
  handleChange(event) {
    event.preventDefault();
    let updateChars = 140 - event.target.value.length;
    if (this.state.charsLeft >= 0) {
      this.setState({
        text: event.target.value,
        charsLeft: updateChars,
      });
    }
  }
  /**
   * @return {object} React Object to render to DOM
   */
  render() {
    return (
      <div id='gameChat'>
        <div>Chars Left: {this.state.charsLeft}</div>
        <textarea id='textGame' value={this.state.text} onChange={this.handleChange} maxLength='140' />
        <button>Send</button>
      </div>
    );
  }
}

export default GameChat;
