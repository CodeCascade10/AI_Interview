import React from 'react'
import "../auth.form.scss"
import { Link } from "react-router-dom"

const Login = () => {

   const handleSubmit =(e)=>{
    e.preventDefault()
   }

  return (
   <main>
    <div className="form-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder='Enter email-address' />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder='Enter your Password here' />
      </div>
      
      <button className='button primary-button'>Login</button>

      </form>
       <p>
          Don't have an account? 
          <a href="/register">Register here</a>
        </p>
    </div>
   </main>
  )
}

export default Login
