import React, { useState } from 'react'
import axios from 'axios'

const CategoryForm = () => {
  const [name, setName] = useState('')
  const createCategory = async () => {
    const { data } = await axios.post('/api/categories', {
      name,
    })
    console.log(data)
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
      <button className="defaultButton" type="button" onClick={createCategory}>
        Create category
      </button>
    </div>
  )
}

export default CategoryForm
