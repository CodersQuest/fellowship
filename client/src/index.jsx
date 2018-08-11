import React from 'react';
import axios from 'axios';

class App extends Component {
    constructor() {
        super();
        this.state = {
            view: '',
        };
    };

    render() {
      return (
        <div>
          <h1>CodeQuest Fellowship</h1>
        </div>
      );
    }
  }

export default App;
