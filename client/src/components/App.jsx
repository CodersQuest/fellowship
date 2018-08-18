import React, {Component} from 'react';
import socket from '../socketClient.js';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, withRouter } from 'react-router-dom';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import GameRoom from './GameRoom.jsx';
import Helpers from '../../helpers';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          view: '/login',
          username: '',
          password: '',
          email:'',
          loggedIn: false,
          clientSocketId: 0,
      };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.viewChange = this.viewChange.bind(this);
    this.logOut = this.logOut.bind(this);
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

  componentDidMount () {
    axios.get('/me').then(res=> {
      if (res.data.user) {

        this.setState({loggedIn: true})
      } else {
        this.setState({loggedIn: false})

      }
      console.log(res.data.user, 'res from checkauth')
    }).catch(error => {
      console.log(error)
    })
  }

  logOut () {
    axios.get('/logout')
    .then(res => {
      this.setState({
        loggedIn: false,
        view: '/login'
      })
    }).catch(err => {
      console.log(err);
    })
  }

  onSubmit(e) {
    //post request to db on submit button
    const { view , email, username, password } = this.state;
    e.preventDefault();
    
    axios.post(view, {
      username: username,
      password: password,
      email: email
    })
    .then((response) => {
      //console.log(response);
      this.setState({
        loggedIn: true
      })
      // update something here based on response url
      history.pushState({key: response.data}, null, response.data);
    })
    .catch(error => {
      throw error;
    });
  }

  render () {
    const { view, loggedIn, email, username, password } = this.state;

    const renderLanding = () => {
      if (view ==='/logout') {
        this.logOut();
      }


      if (view==='/login' && loggedIn === true) {
        return (
          
          <Dashboard
            currentState = { this.state }
            viewChange={this.viewChange}
          />
          
        )
      } else if (view==='/login' && loggedIn === false){
        return (
          <Login onSubmit={this.onSubmit} username={username} pw={password} viewChange={this.viewChange} handleChange={this.handleChange}/>
        )
      } else if (view==='/signup') {
        return  ( 
          <SignUp viewChange={this.viewChange} onSubmit={this.onSubmit} email={email} username={username} pw={password} handleChange={this.handleChange}/>
        )
      } else if (view === '/game' && loggedIn === true) {
        return (
          <GameRoom />
        )
      }
    }
    
    return (
      
    <Router>
     <div>
         
        <h1>CodeQuest Fellowship</h1>
        {renderLanding()}
        <Switch>
          {/* <Route path="/dashboard" render={renderDashboard}/> */}
          <Route path="/games/:game*" render={renderGameRoom}/>
        </Switch>
      </div>
    </Router>
      
    )
  }
}
export default App;
//