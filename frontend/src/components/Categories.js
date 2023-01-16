import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useFetcher, useNavigate, Link } from 'react-router-dom'

const Categories = () => {
  const defaultCategoryImage = '/img/empty-category.png'
  const [categories, setCategories] = useState([])
  const getCategories = async () => {
    const { data: result } = await axios.get('/api/categories')
    setCategories(result)
    console.log(result)
  }
  const navigate = useNavigate()
  const navigateToCategory = (category) => {
    navigate(`/categories/${category.name}`)
  }
  useEffect(() => {
    getCategories()
  }, [])
  return (
    <div className="categories-div">
      {categories.length > 0 ? (
        categories.map((item, index) => (
          <ul key={item._id}>
            <Link to={`${item._id}`}>
              <div className="category-card">
                <img
                  className="category-card-image"
                  alt="category-img"
                  src={item.image ? item.image : defaultCategoryImage}
                />
                <div className="category-card-info">
                  <h2 className="title">{item.name}</h2>
                </div>
              </div>
            </Link>
          </ul>
        ))
      ) : (
        <h1>No categories found</h1>
      )}
    </div>
  )
}

export default Categories
