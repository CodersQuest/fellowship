import React from 'react';


const SignUp = ({handleChange, onSubmit, viewChange}) => (
  <div>
    <h4>Sign Up</h4>
    <form>
    <p onClick={()=> viewChange('/login')}>Login</p>
    <label htmlFor="display-name"> Name: </label>
    <input onChange={handleChange} type="text" id="display-name" name="username"  required />
    <label htmlFor="display-email"> Email:</label>
    <input onChange={handleChange} type="text" id="display-email"  name="email"  required />
    <label htmlFor="display-password"> Password:</label>
    <span>
    <input onChange={handleChange} type="password" name="password" autocomplete="off" required/>
    </span>
    <button onClick={onSubmit} name="submit" type="submit" value="submit-true">
    Submit
    </button>
    </form>
  </div>
)

export default SignUp;