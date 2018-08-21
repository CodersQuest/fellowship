import React from 'react';


const Login = ({handleChange, onSubmit, viewChange}) => (
    
    <div className="container">
      <div className="centerall">
        
        <form >

          <h3 className="is-size-3">Login</h3>

          <div className="field">
            <label className="label"> username </label>
              <input className="input is-success" type="text" placeholder="username" onChange={handleChange} type="text" id="display-name" name="username"  required/>
          </div>

          <div className="field">
            <label className="label"> password </label>
              <input className="input is-success" type="text" placeholder="password" onChange={handleChange} type="text" id="display-name" name="password"  required/>
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