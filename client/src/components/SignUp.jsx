import React from 'react';


const SignUp = ({handleChange, onSubmit, viewChange}) => (

  <div>
    
    <form>

    <h4>Sign Up</h4>

    <p onClick={()=> viewChange('/login')}>Login</p>

    <div className="field">

      <label className="label" > Name: </label>
      <input className="input is-success" onChange={handleChange} type="text" id="display-name" name="username"  required />

    </div>

    <div className="field">

    </div>

    <div className="field">

    </div>



    <label htmlFor="display-email"> Email:</label>
    <input onChange={handleChange} type="text" id="display-email"  name="email"  required />

    <label htmlFor="display-password"> Password:</label>
    <span>
    <input onChange={handleChange} type="password" name="password" autoComplete="off" required/>
    </span>

    <button onClick={onSubmit} name="submit" type="button" value="submit-true">
    Submit
    </button>


    </form>
  </div>

)

export default SignUp;