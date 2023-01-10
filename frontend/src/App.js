import './App.css'
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Signup from './components/Signup'
import Login from './components/Login'
import SongForm from './components/SongForm'
import SongList from './components/SongList'
import EditSong from './components/EditSong'
import CategoryForm from './components/CategoryForm'

const App = () => {
  const [connected, setConnected] = useState(false)
  const [init, setInit] = useState(false)
  const [error, setError] = useState()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  // HEARTBEAT
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
  // INIT TOKEN
  useEffect(() => {
    const initialize = () => {
      const token = window.localStorage.getItem('token')
      axios.defaults.headers.authorization = `Bearer ${token}`
      setInit(true)
    }
    if (!init) {
      initialize()
    }
  })

  // const login = async () => {
  //   const { data } = await axios.post('/api/login', {
  //     username,
  //     password,
  //   })
  //   axios.defaults.headers.authorization = `Bearer ${data.token}`
  //   console.log(data)
  // }
  // const getSongs = async () => {
  //   const { data: songs } = await axios.get('/api/songs')
  //   console.log(songs)
  // }

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/home" element={<h1>Home component</h1>} />
          <Route path="/songs" element={<SongList />} />
          <Route path="/upload-song" element={<SongForm />} />
          <Route path="/songs/:id" element={<EditSong />} />
          <Route path="/categories" element={<h1>Categories</h1>} />
          <Route path="/create-categories" element={<CategoryForm />} />
          <Route path="/users" element={<h1>Users component</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        {/* {error && connected}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>login</button>
        <button onClick={getSongs}>getSongs</button> */}
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
