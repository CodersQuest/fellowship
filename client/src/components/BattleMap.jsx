import React, {Component} from 'react';

class BattleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: []
    }
  }

  render() {
    return (
      <div id="canvas">
        CANVAS GOES HERE
      </div>
    )
  }
}

export default BattleMap;