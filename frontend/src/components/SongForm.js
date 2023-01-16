import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SongList from './SongList'

const SongForm = () => {
  const [artist, setArtist] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  const uploadSong = async () => {
    if (!artist || !title) {
      // these are invalid, set error...
      setError(true)
    } else if (!error) {
      const { data } = await axios.post('/api/songs', {
        artist,
        title,
        selectedCategory,
      })
    }
  }
  const getCategories = async () => {
    const { data: result } = await axios.get('/api/categories')
    setCategories(result)
  }

  useEffect(() => {
    getCategories()
  }, [])
  return (
    <div className="defaultForm">
      <h1>Upload song</h1>
      <input
        className="inputField"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      {error && !artist && (
        <span className="validateErrorMsg">Enter valid artist</span>
      )}
      <input
        className="inputField"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && !title && (
        <span className="validateErrorMsg">Enter valid title</span>
      )}
      <select
        className="inputField"
        placeholder="Category"
        onChange={(e) => {
          setSelectedCategory(e.target.value)
        }}
      >
        {categories.length > 0 &&
          categories.map((item, index) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
      </select>
      <button className="defaultButton" type="button" onClick={uploadSong}>
        Upload
      </button>
    </div>
  )
}

export default SongForm
