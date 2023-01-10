import React, { useState } from 'react'
import axios from 'axios'

const SongForm = () => {
  const [artist, setArtist] = useState('')
  const [title, setTitle] = useState('')
  const [error, setError] = useState(false)

  const uploadSong = async () => {
    if (!artist || !title) {
      // these are invalid, set error...
      setError(true)
      // return false
    }
    const { data } = await axios.post('/api/songs', {
      artist,
      title,
    })
    console.log(data)
  }
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
      <button className="defaultButton" type="button" onClick={uploadSong}>
        Upload
      </button>
    </div>
  )
}

export default SongForm
