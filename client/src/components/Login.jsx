import React from 'react';


const Login = ({handleChange, onSubmit, viewChange}) => (
    
    <div className="container">
      <div className="centerall">
        
        <form >

          <h3 className="is-size-3">Login</h3>

          <div className="field">
            <label className="label"> username </label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success" type="text" placeholder="username" onChange={handleChange} type="text" id="display-name" name="username"  required/>
              <span className="icon is-small is-left"/>
                <i className="fas fa-user"/>
            </div>
          </div>

          <div className="field">
            <label className="label"> password </label>
            <div className="control has-icons-left has-icons-right">
              <input className="input is-success" type="text" placeholder="password" onChange={handleChange} type="text" id="display-name" name="password"  required/>
              <span className="icon is-small is-left"/>
                <i className="fas fa-user"/>
            </div>
          </div>

          <button className="button is-fullwidth" onClick={onSubmit} name="submit" type="submit" value="submit-true">
            Login
          </button>
          <button className="button is-fullwidth">
            <p onClick={()=> viewChange('/signup')}>Sign Up</p>
          </button>
          
        </form>
      </div>
    </div>

)

export default Login;