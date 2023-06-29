/* eslint-disable react/prop-types */
// import loveHeart from '../../assets/loveHeart.jpg'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import HeaderMenu from './HeaderMenu'
import './Header.css'


//eslint-disable-next-line react/prop-types
const Header = ({ user, handleLogOut}) => {
  //eslint-disable-next-line react/prop-types
  const userId = user?.uid

  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    //eslint-disable-next-line react/jsx-no-comment-textnodes
    <header className='header'>
      <nav className='container header-nav'>
        <Link to='/' className='header-logo' style={{ background: 'none' }}>
          <h1 className=''>LoveDesk</h1>
        </Link>

        <ul className='nav-ul'>
          <li>
            <Link to='/'> Home </Link>
          </li>
          <li>
            <Link to='/about'> About </Link>
          </li>
          <li>
            <Link to='/create'> Create</Link>
          </li>
          {userId ? (
            <>
              <li>
                <p className='welcome'>Welcome, {user?.displayName}</p>
              </li>
              <li>
                <button onClick={handleLogOut} className='btn'>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to='/Auth'> Login </Link>
            </li>
          )}
        </ul>
        <button
          aria-label='open menu'
          className={`menu-btn  ${showMenu ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <HeaderMenu showMenu={showMenu} />
    </header>
  )
}

export default Header
