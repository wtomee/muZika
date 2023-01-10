import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const signup = async () => {
    const { data } = await axios.post('/api/register', {
      username,
      password,
    })
    console.log(data)
    navigate('/')
  }
  return (
    <div className="signup">
      <h1>Signup</h1>
      <input
        className="inputField"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="inputField"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="defaultButton" type="button" onClick={signup}>
        Sign up
      </button>
    </div>
  )
}

export default Signup
