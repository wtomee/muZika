import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const login = async () => {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    })
    axios.defaults.headers.authorization = `Bearer ${data.token}`
    window.localStorage.setItem('token', data.token)
    console.log(data)
    navigate('/')
  }

  return (
    <div className="login">
      <h1>Login</h1>
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
      <button className="defaultButton" type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default Login
