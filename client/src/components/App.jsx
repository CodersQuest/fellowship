import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import GameRoom from './GameRoom.jsx';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          view: '',
          username: '',
          password: '',
          email:''
      };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.viewChange = this.viewChange.bind(this);
  }


  handleChange (e) {
    this.setState({
     [e.target.name] : e.target.value
    });
  }

  viewChange(text) {
    this.setState({
      view: text
    })
  }

  onSubmit() {
    //post request to db on submit button
    const { view , email, username, password } = this.state;
    axios.post(view, {
      username: username,
      password: password,
      email: email
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      throw error;
    });
  }

  render () {
    const { email, username, password } = this.state;

    const renderLogin = () => {
      return (
              <Login onSubmit={this.onSubmit} username={username} pw={password} handleChange={this.handleChange}/>
            )
    }

    const renderSignUp = () => {
      return  ( 
              <SignUp onSubmit={this.onSubmit} email={email} username={username} pw={password} handleChange={this.handleChange}/>
            )
    }

    const renderDashboard = () => {
      return  ( 
              <Dashboard />
            )
    }

    const renderGameRoom = () => {
      return (
        <GameRoom />
      )
    }

    return (
      
    <Router>
     <div>
         
        <h1>CodeQuest Fellowship</h1>
        <nav>
          <ul>
          <li onClick={()=> this.viewChange('/login')}><Link to="/login">Login</Link></li>
          <li onClick={()=> this.viewChange('/signup')}><Link to="/signup">Sign Up</Link></li>
          <li><Link to ="/Dashboard">Dashboard</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/login" render={renderLogin}/>
          <Route path="/signup" render={renderSignUp}/>
          <Route path="/dashboard" render={renderDashboard}/>
          <Route path="/games/:game*" render={renderGameRoom}/>
        </Switch>
      </div>
    </Router>
      
    )
  }
}
export default App;
//