import React from 'react';

// Component to render battle log messages.
// This includes Dice Rolls, and eventually player messages and spells/skills
class BattleLog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="battleLog">
        <h1>BATTLE LOG</h1>
      </div>
    )
  }
}

export default BattleLog;