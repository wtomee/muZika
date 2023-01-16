import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [exists, setExists] = useState(false)
  const [emptyUsername, setEmptyUsername] = useState(false)
  const [emptyPassword, setEmptyPassword] = useState(false)

  const signup = async () => {
    if (username && password) {
      const { data } = await axios.post('/api/register', {
        username,
        password,
      })
      if (data && !data.error) {
        axios.defaults.headers.authorization = `Bearer ${data.token}`
        window.localStorage.setItem('token', data.token)
        window.localStorage.setItem('name', data.name)
        console.log(data)
        navigate('/songs')
      } else if (data.error) {
        setExists(true)
        console.log(data.error)
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
    <div className="signup">
      <h1>Signup</h1>
      <input
        className="inputField"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {exists && <span className="validateErrorMsg">Username exists</span>}
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
      {emptyPassword && !password && (
        <span className="validateErrorMsg">Required to fill field</span>
      )}
      <button className="defaultButton" type="button" onClick={signup}>
        Sign up
      </button>
    </div>
  )
}

export default Signup
