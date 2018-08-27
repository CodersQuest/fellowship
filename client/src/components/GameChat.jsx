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
   * @param {event} e event passed through change in textArea.
   */
  handleChange(event) {
    console.log(event.target);
    event.preventDefault();
    this.setState({
      text: event.target.value,
    })
  }
  /**
   * @return {object} React Object to render to DOM
   */
  render() {
    return (
      <div id='gameChat'>
        <form>
          <textarea value={this.state.text} onChange={this.handleChange} maxLength='140' />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default GameChat;
