import React, { useState } from 'react'
import axios from 'axios'

const CategoryForm = () => {
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
