
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const response = await fetch("http://localhost:5000/api/createuser", {
    const response = await fetch("https://mern-food-backend-bidz.onrender.com/api/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      localStorage.setItem('authtoken', json.authToken)
      navigate("/login")
    } else {
      alert("Enter Valid Credentials")
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className="signup-page">
        <div className="form-container">
          <form className="form-content" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
              <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
            </div>
            <div className="form-group">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputEmail" aria-describedby="emailHelp" />
            </div>
            <button type="submit" className="btnn btn-success">Submit</button>
            <button onClick={() => navigate('/login')} className="btnn btn-danger">Already a user</button>
          </form>
        </div>
      </div>
    </>
  )
}
