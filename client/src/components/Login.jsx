import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';


const Login = ({handleChange, onSubmit, viewChange}) => (
  <div>
    <h4>Login</h4>
    <form method="POST" action='/login'>
    <p onClick={()=> viewChange('/signup')}><Link to="/signup">Sign Up</Link></p>
    <label htmlFor="display-name"> Name: </label>
    <input onChange={handleChange} type="text" id="display-name" name="username"  required />
    <label htmlFor="display-password"> Password:</label>
    <span>
    <input onChange={handleChange} type="password" name="password" autoComplete="off" required/>
    
    </span>    
    <button onClick={onSubmit} name="submit" type="submit" value="submit-true">
    Submit
    </button>
    </form>
  </div>
)

export default Login;