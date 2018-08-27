import react from 'react';
import {socket} from '../socketClient.js';
// import the socket connection from socketClient

export const withSocket = (Component) => {
  return class extends react.Component {
    constructor(props) {
      super(props);
      this.state = {
        logs: [],
        tokens: [],
        player: [],
      };
    }

    componentDidMount() {
      this.init();
    }

    init() {
      socket.on('something', (data) => {
        // pass data through updateState
        this.updateState(/** takes in a type based on state to update, as well as the data coming back*/);
      });
      socket.on('updateBattleLog', (data) => {
        // pass data through updateState
        console.log(data);
        this.updateState(logs, data);
      });
      // repeat pattern for each event client needs to listen for.
    }

    updateState(type, data) {
      this.setState({[type]: data,});
    }

    render() {
      return (<Component logs={this.state.logs} tokens={this.state.tokens} players={this.state.players}/>);
    }
  };
};
