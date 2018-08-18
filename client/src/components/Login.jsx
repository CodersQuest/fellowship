import React from 'react';


const Login = ({handleChange, onSubmit, viewChange}) => (
  <div className="columns is-mobile is-centered">
    <div className="column is-half">
      <p onClick={()=> viewChange('/signup')}>Sign Up</p>

      <h3>Login</h3>

      <form >

        <div className="field">
          <label classsName="label"> username </label>
          <div className="control has-icons-left has-icons-right">
            <input className="input is-success" type="text" placeholder="username" onChange={handleChange} type="text" id="display-name" name="username"  required/>
            <span className="icon is-small is-left"/>
              <i className="fas fa-user"/>
          </div>
        </div>

        <div className="field">
          <label classsName="label"> password </label>
          <div className="control has-icons-left has-icons-right">
            <input className="input is-success" type="text" placeholder="password" onChange={handleChange} type="text" id="display-name" name="password"  required/>
            <span className="icon is-small is-left"/>
              <i className="fas fa-user"/>
          </div>
        </div>

        <button className="button is-fullwidth" onClick={onSubmit} name="submit" type="submit" value="submit-true">
          Login
        </button>
        
      </form>
    </div>
  </div>  
)

export default Login;