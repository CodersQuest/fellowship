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
              <h1 className='heading'>BATTLE LOG</h1>
            </div>

            <div className='log-display-wrapper'>
              <div className='log-entry-view'>
                <ul>
                  {this.props.currentLog.map((logentry) => (
                    <BattleLogEntry
                      // handleDisplayLog={this.props.handleDisplayLog}
                      logentry={logentry}
                      {...this.props}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div> // end #battleLog
    );
  }
}

export default BattleLog;
