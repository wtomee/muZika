import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditSong = () => {
  const [artist, setArtist] = useState('')
  const [title, setTitle] = useState('')
  const params = useParams()
  const navigate = useNavigate()

  const getSongDetails = async (params) => {
    const { data: result } = await axios.get(`/api/songs/${params.id}`)
    // console.log(result)
    setArtist(result.artist)
    setTitle(result.title)
  }

  useEffect(() => {
    getSongDetails(params)
  }, [])

  const editSong = async () => {
    // console.log(artist, title)
    const { data: result } = await axios.put(`/api/songs/${params.id}`, {
      artist,
      title,
    })
    navigate('/songs')
    // console.log(result)
  }
  return (
    <div className="defaultForm">
      <h1>Edit song</h1>
      <input
        className="inputField"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        className="inputField"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="defaultButton" type="button" onClick={editSong}>
        Edit song
      </button>
    </div>
  )
}

export default EditSong
