import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          view: '',
      };
  }

  render() {
    return (
      <div>
        <h1>CodeQuest Fellowship</h1>
      </div>
    )
  }
}
export default App;