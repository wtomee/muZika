import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Nav = () => {
  const auth = localStorage.getItem('token')
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }
  return (
    <div>
      <img
        className="navbarLogo"
        alt="logo"
        src="https://www.nicepng.com/png/full/9-96506_music-transparent-wave-electronic-music-png.png"
      />
      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/songs">Songs</Link>
          </li>
          <li>
            <Link to="/upload-song">Upload song</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/create-categories">Create categories</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Nav
