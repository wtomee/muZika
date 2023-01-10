import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const SongList = () => {
  const [songs, setSongs] = useState([])
  const getSongs = async () => {
    const { data: result } = await axios.get('/api/songs')
    setSongs(result)
    console.log(result)
  }

  useEffect(() => {
    getSongs()
  }, [])

  const deleteSong = async (id) => {
    const { data: result } = await axios.delete(`/api/songs/${id}`)
    console.log(result)
    if (result) {
      getSongs()
    }
  }

  const filtering = async (event) => {
    const filterString = event.target.value
    if (filterString) {
      const { data: result } = await axios.get(`/api/search/${filterString}`)
      if (result) {
        setSongs(result)
      }
    } else {
      getSongs()
    }
  }
  return (
    <div className="defaultList">
      <h1>Song List</h1>
      <input
        type=""
        className="filterField"
        placeholder="Filter by artist, title"
        onChange={filtering}
      />
      <ul>
        <li className="column">Artist</li>
        <li className="column">Title</li>
        <li className="column">Action</li>
      </ul>
      {songs.length > 0 ? (
        songs.map((item, index) => (
          <ul key={item._id}>
            <li>{item.artist}</li>
            <li>{item.title}</li>
            <li>
              <Link to={`${item._id}`}>
                <button className="actionButton">Edit</button>
              </Link>
              <button
                className="actionButton"
                onClick={() => deleteSong(item._id)}
              >
                Delete
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1>No result</h1>
      )}
    </div>
  )
}

export default SongList
