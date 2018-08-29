import React from 'react';
import {withRouter} from 'react-router-dom';
import QuestLogo from './QuestLogo.jsx';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.goToPath = this.goToPath.bind(this);
  }
  goToPath(path) {
    // console.log('Login clicked');
    this.props.history.push(path);
  }

  render() {
    const {handleChange, onSubmit} = this.props;

    return (
      <React.Fragment>
        <div className="signUpBg"></div>
        <div className="container">
          <div className="signUpLogo">
            <QuestLogo />
          </div>
          <div className="centerall">
            <form>
            <div className="field">
              <input className="input is-warning"
                onChange={handleChange}
                type="text"
                placeholder="create username"
                id="display-name"
                name="username"
                required
              />
            </div>
            <div className="field">
              <input className="input is-warning"
                onChange={handleChange}
                type="text" placeholder="email"
                id="display-email"
                name="email"
                required
              />
            </div>
            <div className="field">
              <span>
              <input className="input is-warning"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="password"
                autoComplete="off"
                required
              />
              </span>
            </div>
            <button className="button is-fullwidth" onClick={onSubmit} name="submit" type="submit" value="submit-true">
            Sign Up
            </button>
            <button className="button is-fullwidth"
              onClick={()=> this.goToPath('/login')}
            >Already a Member? (Login)
            </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(SignUp);
