import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SongList from './SongList'

const CategoryDetails = () => {
  const defaultCategoryImage =
    'http://static1.squarespace.com/static/530b728de4b04fc9b23a5988/t/569880381a5203aa7d44c1a8/1452834873397/00.jpg'
  const [category, setCategory] = useState('')
  const params = useParams()
  const getCategoryDetails = async (params) => {
    console.log('getcategoryDetails:', params)
    const { data: result } = await axios.get(`/api/categories/${params.id}`)
    console.log(result)
    setCategory(result)
  }
  useEffect(() => {
    getCategoryDetails(params)
  }, [])
  return (
    <div>
      <h1>CategoryDetails</h1>
      <div className="category-card">
        <img
          className="category-card-image"
          alt="category-img"
          src={category.image ? category.image : defaultCategoryImage}
        />
        <div className="category-card-info">
          <h2 className="title">{category.name}</h2>
        </div>
      </div>
      {console.log(category)}
      <SongList category={category} />
    </div>
  )
}

export default CategoryDetails
