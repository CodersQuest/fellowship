import React, {Component} from 'react';
import BattleLogEntry from './BattleLogEntry.jsx';
import 'bulma/css/bulma.css';

// Component to render battle log messages.
// This includes Dice Rolls, and eventually player messages and spells/skills
class BattleLog extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.scrollToBottom = this.scrollToBottom.bind(this);
  }
  scrollToBottom() {
    this.logEnd.scrollIntoView({behavior: 'smooth'});
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <div id="battleLog">
        <h1 className='heading' id="battleLogHeader">BATTLE LOG</h1>
        <div className='log-entry-view'>
          <ul>
            {this.props.currentLog.map((logentry) => (
              <BattleLogEntry
                key={logentry.timestamp}
                logentry={logentry}
                {...this.props}
              />
            ))}
          </ul>
        </div>
        <div ref={(el) => this.logEnd = el}></div>
      </div> // end #battleLog
    );
  }
}

export default BattleLog;
