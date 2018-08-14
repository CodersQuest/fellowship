import React from 'react';

const Login = ({handleChange, onSubmit}) => (
  <div>
    <h4>Login</h4>
    <label htmlFor="display-name"> Name: </label>
    <input onChange={handleChange} type="text" id="display-name" name="username"  required />
    <label htmlFor="display-password"> Password:</label>
    <input onChange={handleChange} type="password" id="display-password"  name="password"  required />
    <button onClick={onSubmit} name="submit" type="submit" value="submit-true">
    Submit
    </button>
  </div>
)

export default Login;