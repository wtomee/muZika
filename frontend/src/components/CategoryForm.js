import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CategoryForm = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [nameExists, setNameExists] = useState(false)
  const [emptyCategoryName, setEmptyCategoryName] = useState(false)
  const resetValidatorfields = () => {
    setNameExists(false)
    setEmptyCategoryName(false)
  }
  const createCategory = async () => {
    if (name && image) {
      const { data } = await axios.post('/api/categories', {
        name,
        image,
      })
      console.log(data)
      if (data.error) {
        setNameExists(true)
      }
      if (data && !data.error && !nameExists && !emptyCategoryName) {
        navigate('/categories')
      }
    } else if (name && !image) {
      const { data } = await axios.post('/api/categories', {
        name,
      })
      console.log(data)
      if (data.error) {
        setNameExists(true)
      }
      if (data && !data.error && !nameExists && !emptyCategoryName) {
        navigate('/categories')
      }
    } else if (!name) {
      setEmptyCategoryName(true)
    }
  }
  return (
    <div className="defaultForm">
      <h1>Create category</h1>
      <input
        className="inputField"
        placeholder="Category"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {nameExists && <span className="validateErrorMsg">Category exists</span>}
      {emptyCategoryName && !name && (
        <span className="validateErrorMsg">Required to fill field</span>
      )}
      <input
        className="inputField"
        placeholder="Image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button
        className="defaultButton"
        type="button"
        onClick={resetValidatorfields && createCategory}
      >
        Create category
      </button>
    </div>
  )
}

export default CategoryForm
