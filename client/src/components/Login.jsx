import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: ''
    };
    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange (event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLogin (event) {
    event.preventDefault();
    axios.post('/login', {
      // data will be placed here
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
  render () {
    return (
      <div className="Login">
        <form onSubmit={this.handleLogin}>
          <input type="text" name="name" placeholder=" username" />
          <input type="password" name="password" placeholder=" password " />
          <input type="submit" value="Login"/>
        </form>
      </div>
    )
  }

}

export default Login;