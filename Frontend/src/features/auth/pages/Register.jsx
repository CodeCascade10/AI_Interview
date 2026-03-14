import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="username">UserName</label>
            <input type="text" id="username" placeholder="Enter your username Here" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter email-address" />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your Password here" />
          </div>

          <button className="button primary-button">
            Register
          </button>

        </form>

        <p>
          Already have an account? 
          <Link to="/login">Login</Link>
        </p>

      </div>
    </main>
  )
}

export default Register
