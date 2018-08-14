import React, {Component} from 'react';
import GamesList from './GamesList.jsx';
import styles from '../styles/App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import data from './dashBoardDummyData.js';

// get request on load

// 
class Dashboard extends Component {
  constructor(props) {
    super(props)
  }
  
  // componentDidMount method to retrive game data
  componentDidMount() {
    
  }
  
  render () {
    console.log(data);
    return (
      <div className="dashBoard">
        <GamesList games={data} />
      </div>
    );
  }
  
};

export default Dashboard;
