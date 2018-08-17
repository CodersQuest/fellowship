import React, {Component} from 'react';
import openSocket from 'socket.io-client'; 
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';
import GameRoom from './GameRoom.jsx';
import Helpers from '../../helpers';


class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          view: '',
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

      // if (this.state.view ==='/logout') {
      //   this.onSubmit()
      // }
    
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
        loggedIn: false
      })
      console.log('res from logout', res);
    }).catch(err => {
      console.log(err);
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
      //init the client socket connection.

    })
    .catch(error => {
      throw error;
    });
  }

  render () {
    const { email, username, password } = this.state;
    let currentState = this.state;
    
    const renderLogin = () => {
      return (
        <Login username={username} pw={password} viewChange={this.viewChange} handleChange={this.handleChange}/>
            )
    }

    const renderSignUp = () => {
      return  ( 
              <SignUp viewChange={this.viewChange} onSubmit={this.onSubmit} email={email} username={username} pw={password} handleChange={this.handleChange}/>
            )
    }

    const renderDashboard = () => {
      
      return  ( 
              <Dashboard
                currentState = { currentState }
              />
            )
    }

    const renderGameRoom = () => {
      return (
        <GameRoom />
      )
    }

    const renderLanding = () => {
      if (this.state.view ==='/logout') {
        this.logOut();
      }


      if (this.state.loggedIn === true) {
        return ( 
          <Dashboard
            currentState = { currentState }
            viewChange={this.viewChange}
          />
        )
      } else {
        return renderLogin();
      }
    }
    //TODO:
    //if loggedIn === true, redirect to dashboard from \
    //if loggedIn ===false, redirect to login from \
    //if loggedIn === true, "login" becomes "logout"
      //conditional rendering of text
      //pass in different path text
    return (
      
    <Router>
     <div>
         
        <h1>CodeQuest Fellowship</h1>
        {/* <nav>
          <ul>
          <li onClick={()=> this.viewChange('/signup')}><Link to="/signup">Sign Up</Link></li>
          <li><Link to ="/dashboard">Dashboard</Link></li>
          <li onClick={()=> this.viewChange('/logout')}><Link to ="/login">Logout</Link></li>

          </ul>
        </nav> */}
        {/* <li onClick={()=> this.viewChange('/logout')}><Link to ="/login">Logout</Link></li> */}

        {renderLanding()}
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