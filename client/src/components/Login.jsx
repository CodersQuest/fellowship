import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: '',
      };
      this.submitHandler = this.submitHandler.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.goToPath = this.goToPath.bind(this);
    }

    handleChange(e) {
      this.setState({
       [e.target.name]: e.target.value,
      });
    }

    goToPath(path) {
      // console.log('Signup clicked');
      this.props.history.push(path);
    }


    submitHandler(e) {
      // post request to db on submit button
      const {username, password} = this.state;
      const {setUser, history} = this.props;

      axios.post('/login', {username, password})
        .then((response) => {
          console.log(response);
          setUser(response.data.user, ()=> {
            const {from = '/'} = this.props.location.state ? this.props.location.state : {};
            history.push(from);
          });
        })
        .catch((error) => {
          throw error;
        });
    }

    render() {
      return (
        <div className="container">
          <div className="centerall">

            <form
              onSubmit={(e) => {
                e.preventDefault();
                this.submitHandler(e);
              }}
            >

              <h3 className="is-size-3">Login</h3>

              <div className="field">
                <label
                  htmlFor='username'
                  className="label"
                > username </label>
                  <input
                    className="input is-success"
                    type="text"
                    placeholder="username"
                    onChange={this.handleChange}
                    id="display-name"
                    name="username"
                    required
                  />
              </div>

              <div className="field">
                <label
                  htmlFor='password'
                  className="label"
                > password </label>
                  <input
                    className="input is-success"
                    placeholder="password"
                    onChange={this.handleChange}
                    type="text"
                    id="display-name"
                    name="password"
                    required
                  />
              </div>

              <button
                className="button is-fullwidth"
                type="submit">
                Login
              </button>
              <button
                className="button is-fullwidth"
                type="button"
                onClick={() => this.goToPath('/signup')}
               >Sign Up
              </button>

            </form>
          </div>
        </div>
      );
    }
}

export default withRouter(Login);
