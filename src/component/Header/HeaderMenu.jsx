import { Link } from "react-router-dom"
import './Header.css'
// eslint-disable-next-line react/prop-types
const HeaderMenu = ({showMenu}) => {
  return (
    <ul className={`nav-menu-ul  ${showMenu ? 'open' : ''}`}>
      <li>
        <Link to='/'> Home </Link>
      </li>
      <li>
        <Link to='/about'> About </Link>
      </li>
      <li>
        <Link to='/blog'> Blog </Link>
      </li>
      <li>
        <button> Logout </button>
      </li>
      <li>
        <Link to='/sign-up'> Sign Up </Link>
      </li>
    </ul>
  )
}

export default HeaderMenu