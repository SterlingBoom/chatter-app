import { Link } from "react-router-dom"
import './Header.css'
// eslint-disable-next-line react/prop-types
const HeaderMenu = ({showMenu, handleLogOut, user}) => {
  // eslint-disable-next-line react/prop-types
  const userId = user?.uid
  return (
    <ul className={`nav-menu-ul  ${showMenu ? 'open' : ''}`}>
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
            {/* eslint-disable-next-line react/prop-types */}
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

      {/* <li>
        <button> Logout </button>
      </li> */}
    </ul>
  )
}

export default HeaderMenu