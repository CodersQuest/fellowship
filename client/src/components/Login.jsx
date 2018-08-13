import React from 'react';

const Login = ({handleChange}) =>
         (
            <div>
                <h4>Login</h4>
                <label htmlFor="display-name"> Name: </label>
                <input onChange={handleChange} type="text" id="display-name" name="username"  required />
                <label htmlFor="display-password"> Password:</label>
                <input onChange={handleChange} type="text" id="display-password"  name="password"  required />
            </div>
        )

export default Login;