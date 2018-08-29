import React, {Component} from 'react';
import BattleLogEntry from './BattleLogEntry.jsx';
import 'bulma/css/bulma.css';

// Component to render battle log messages.
// This includes Dice Rolls, and eventually player messages and spells/skills
class BattleLog extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div id="battleLog">
        <div className='columns'>
          <div className='column'>
            <div className='level-item has-text-centered custom-bg'>
              <h1 className='heading' id="battleLogHeader">BATTLE LOG</h1>
            </div>

              <div className='logMessages'>
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
          </div>
        </div>
      </div> // end #battleLog
    );
  }
}

export default BattleLog;
