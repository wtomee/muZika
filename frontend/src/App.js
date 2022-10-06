import React, { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'

const App = () => {
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const {
          data: { connection },
        } = await axios.get('/api/heartbeat')
        setConnected(connection)
      } catch (error) {
        setError(error.message)
      }
    }
    getData()
  }, [])

  const login = async () => {
    const { data } = await axios.post('/api/login', {
      username,
      password,
    })
    axios.defaults.headers.authorization = `Bearer ${data.token}`
    console.log(data)
  }
  const getSongs = async () => {
    const { data: songs } = await axios.get('/api/songs')
    console.log(songs)
  }

  return (
    <div className="App">
      {error && connected}
      <input value={username} onChange={(e) => setUsername(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>login</button>
      <button onClick={getSongs}>getSongs</button>
    </div>
  )
}

export default App
