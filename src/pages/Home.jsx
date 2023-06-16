import Rain from "../assets/goldLove.jpg"
const Home = () => {
  return (
    <div className='hero'>
      <div className='hero-image'>
        <img src={Rain} alt='flower' />
      </div>
      <div className='hero-text'>
        <h1>Welcome to LoveDesk! </h1>
        <h4> Unleash the power of love and good relationships</h4>
        
          <button className="btn">Get started</button>
        
      </div>
    </div>
  )
}

export default Home