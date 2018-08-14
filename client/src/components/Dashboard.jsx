import React, {Component} from 'react';
import GamesList from './GamesList.jsx';

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="dashBoard">
        <GamesList />
      </div>
    );
  }
};

export default Dashboard;
// 