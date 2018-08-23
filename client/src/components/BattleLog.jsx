import React from 'react';
import 'bulma/css/bulma.css';

// Component to render battle log messages.
// This includes Dice Rolls, and eventually player messages and spells/skills
class BattleLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logStorage:[],
    }
    this.handleDisplayLog = this.handleDisplayLog.bind(this);
  }

  handleDisplayLog(logArr) {

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
                {/* static dom element to be replaced by Component */}
              </div>
            </div>
          </div>
        </div>
      </div> // end #battleLog
    )
  }
}

export default BattleLog;