import React from 'react';

const SignUp = ({handleChange, onSubmit}) => (
  <div>
    <h4>Sign Up</h4>
    <label htmlFor="display-name"> Name: </label>
    <input onChange={handleChange} type="text" id="display-name" name="username"  required />
    <label htmlFor="display-email"> Email:</label>
    <input onChange={handleChange} type="text" id="display-email"  name="email"  required />
    <label htmlFor="display-password"> Password:</label>
    <span>
   <input onChange={handleChange} type="hidden" name="password" required/>
   <input type="password" className="masked" id="password" autoComplete="off" />
</span>
    <button onClick={onSubmit} name="submit" type="submit" value="submit-true">
    Submit
    </button>
  </div>
)

export default SignUp;