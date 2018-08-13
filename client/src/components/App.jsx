import React, {Component} from 'react';
import axios from 'axios';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          view: 'login',
          username: '',
          password: ''
      };
    this.clickHandler = this.clickHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  clickHandler (view) {

    this.setState({
      view: view
    });
  }

  handleChange (e) {
    this.setState({
     [e.target.name] : e.target.value
    });
  }

  render() {
    //view switcher
    const {view} = this.state;
    const landingView = () => {
      if (view === 'login') {
        return (
          <Login username={this.state.username} pw={this.state.password} handleChange={this.handleChange}/>
        )
      } else if (view === 'signup') {
        return  ( 
          <SignUp username={this.state.username} pw={this.state.password} handleChange={this.handleChange}/>
        )
      }
    }


    return (
      <div>
        <h1>CodeQuest Fellowship</h1>
        <nav>
          <h6 onClick={() =>this.clickHandler('signup')}>Signup</h6>
          <h6 onClick={() =>this.clickHandler('login')}>Login</h6>

        </nav>
        {landingView()}
      </div>
    )
  }
}
export default App;