import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useFetcher, useNavigate, Link } from 'react-router-dom'

const Categories = () => {
  const defaultCategoryImage =
    'http://static1.squarespace.com/static/530b728de4b04fc9b23a5988/t/569880381a5203aa7d44c1a8/1452834873397/00.jpg'
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
