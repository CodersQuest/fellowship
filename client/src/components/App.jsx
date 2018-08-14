import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          username: '',
          password: ''
      };
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange (e) {
    this.setState({
     [e.target.name] : e.target.value
    });
  }

  render() {
    const { view, username, password } = this.state;

    const renderLogin = () => {
      return (
              <Login username={username} pw={password} handleChange={this.handleChange}/>
            )
    }

    const renderSignUp = () => {
      return  ( 
              <SignUp username={username} pw={password} handleChange={this.handleChange}/>
            )
    }

    const renderDashboard = () => {
      return  ( 
              <Dashboard />
            )
    }

    return (
      
    <Router>
     <div>
         
        <h1>CodeQuest Fellowship</h1>
        <nav>
          <ul>
          <li><Link to="/">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to ="/Dashboard">Dashboard</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" render={renderLogin}/>
          <Route path="/signup" render={renderSignUp}/>
          <Route path="/dashboard" render={renderDashboard}/>
        </Switch>
      </div>
    </Router>
      
    )
  }
}
export default App;