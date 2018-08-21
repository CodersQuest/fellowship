import React from 'react';


const SignUp = ({handleChange, onSubmit, viewChange}) => (

  <div className="container">
    <div className="centerall">
      <form>

      <h4 className="is-size-3">Sign Up</h4>


      <div className="field">
        <label className="label" > Name: </label>
          <div className="control has-icons-left has-icons-right">
          <input className="input is-success" onChange={handleChange} type="text" placeholder="create username" id="display-name" name="username"  required />
        </div>
      </div>

      <div className="field">
        <label className="label"> Email:</label>
        <div className="control has-icons-left has-icons-right">
          <input className="input is-success" onChange={handleChange} type="text" placeholder="email" id="display-email"  name="email"  required />
        </div>
      </div>

      <div className="field">
        <label className="label"> Password:</label>
        <span>
        <input className="input is-success" onChange={handleChange} type="password" name="password" placeholder="password" autoComplete="off" required/>
        </span>
      </div>

      <button className="button is-fullwidth" onClick={onSubmit} name="submit" type="submit" value="submit-true">
      Sign Up
      </button>

      <button className="button is-fullwidth">
        <p onClick={()=> viewChange('/login')}>Already a Member? (Login)</p>
      </button>

      </form>
    </div>
    
  </div>

)

export default SignUp;