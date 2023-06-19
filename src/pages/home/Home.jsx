import Rain from '../../assets/DHoldHands.jpg'
import couple from '../../assets/coffeeCouple.jpg'
import { Link } from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <>
      <div className='hero '>
        <div className='hero-image'>
          <img src={Rain} alt='flower' />
        </div>
        <div className='hero-text'>
          <h1>Welcome to LoveDesk! </h1>
          <h4> Unleash the power of love and good relationships</h4>
          <Link to="/auth" >
          <button className='btn'>Get started</button>
          </Link>
        </div>
      </div>

      <div className='about-section container'>
        <div className='about-text'>
         <h1>About LoveDesk</h1>
          <h3>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            doloribus ad inventore! Nostrum mollitia sit odio impedit magni
            perferendis error, eius maxime minus rem esse ex. Cupiditate,
            commodi? Itaque sint libero mollitia.
          </h3>
        </div>
        <div className='about-img'>
          <img src={couple} alt='couple' />
        </div>
      </div>
    </>
  )
}

export default Home
