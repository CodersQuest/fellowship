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
    this.handleSubmit = this.handleSubmit.bind(this);
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
   * Calls this.props.sendChat, but must also reset the state accordingly to reset chat.
   */
  handleSubmit() {
    if (this.state.text.length > 0) {
      this.props.sendChat(this.state.text);
      this.setState({
        text: '',
        charsLeft: 140,
      });
    }
  }
  /**
   * @return {object} React Object to render to DOM
   */
  render() {
    return (
      <div id='gameChat'>
        <textarea id='textGame' value={this.state.text} onChange={this.handleChange} maxLength='140' />
        <div id="textSubmit">
          <button onClick={this.handleSubmit}>Send</button>
          <div>Chars Left: {this.state.charsLeft}</div>
        </div>
      </div>
    );
  }
}

export default GameChat;
