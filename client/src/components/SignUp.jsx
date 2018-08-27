import React from 'react';
import {withRouter} from 'react-router-dom';

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
        <div className="container">
      <div className="centerall">
        <form>

        <h4 className="is-size-3">Sign Up</h4>


        <div className="field">
          <label className="label" > Name: </label>
            <input className="input is-success"
              onChange={handleChange}
              type="text"
              placeholder="create username"
              id="display-name"
              name="username"
              required
            />
          </div>

        <div className="field">
          <label className="label"> Email:</label>
            <input className="input is-success"
              onChange={handleChange}
              type="text" placeholder="email"
              id="display-email"
              name="email"
              required
            />
          </div>

        <div className="field">
          <label className="label"> Password:</label>
          <span>
          <input className="input is-success"
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
    );
  }
}

export default withRouter(SignUp);
