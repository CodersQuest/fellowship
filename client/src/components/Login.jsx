import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import QuestLogo from './QuestLogo.jsx';
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
      const {
        username,
        password,
      } = this.state;
      const {
        setUser,
        history,
      } = this.props;

      axios.post('/login', {
        username,
        password,
      }).then((response) => {
          setUser(response.data.user, ()=> {
            const {from = '/', } = this.props.location.state ? this.props.location.state : {};
            history.push(from);
          });
        })
        .catch((error) => {
          console.log('caTCH CHECK', error);
          throw error;
        });
    }

    render() {
      return (
        <React.Fragment>
          <div className="loginBg"></div>
          <div className="container">
            <div className="loginLogo">
              <QuestLogo />
            </div>
            <div className="centerall">

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.submitHandler(e);
                }}
              >

                <div className="field">
                    <input
                      className="loginInputs"
                      type="text"
                      placeholder="username"
                      onChange={this.handleChange}
                      id="display-name"
                      name="username"
                      required
                    />
                </div>

                <div className="field">
                    <input
                      className="loginInputs"
                      placeholder="password"
                      onChange={this.handleChange}
                      type="password"
                      id="display-password"
                      name="password"
                      required
                    />
                </div>

                <button
                  className="loginButton"
                  type="submit">
                  Login
                </button>
                <button
                  className="signUpButton"
                  type="button"
                  onClick={() => this.goToPath('/signup')}
                >Sign Up
                </button>

              </form>
            </div>
          </div>
        </React.Fragment>
      );
    }
}

export default withRouter(Login);
