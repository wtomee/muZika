import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [notExists, setNotExists] = useState(false)
  const [badPassword, setBadPassword] = useState(false)
  const [emptyUsername, setEmptyUsername] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)

  const login = async () => {
    if (username && password) {
      const { data } = await axios.post('/api/login', {
        username,
        password,
      })
      if (data && !data.error && !data.passwordError) {
        axios.defaults.headers.authorization = `Bearer ${data.token}`
        window.localStorage.setItem('token', data.token)
        console.log(data)
        navigate('/')
      } else if (data.error) {
        setNotExists(true)
        console.log(data.error)
      } else if (data.passwordError) {
        setBadPassword(true)
        console.log(data.passwordError)
      }
    } else {
      if (!username) {
        setEmptyUsername(true)
      }
      if (!password) {
        setEmptyPassword(true)
      }
    }
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
      {notExists && (
        <span className="validateErrorMsg">Username not found</span>
      )}
      {emptyUsername && !username && (
        <span className="validateErrorMsg">Required to fill field</span>
      )}
      <input
        className="inputField"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {badPassword && password && (
        <span className="validateErrorMsg">Bad password</span>
      )}
      {emptyPassword && !password && (
        <span className="validateErrorMsg">Required to fill fields</span>
      )}
      <button className="defaultButton" type="button" onClick={login}>
        Login
      </button>
    </div>
  )
}

export default Login
