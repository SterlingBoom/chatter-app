/* eslint-disable react/no-unescaped-entities */
import "./Footer.css"

const Footer = () => {
  return (
   <div className='footer-bg'>
    <footer className='footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <h3>About Us</h3>
            <p>
               We offer expert articles, insightful tips, and a
              supportive community to empower people in their personal journeys.
              Whether you're seeking guidance, inspiration, or simply looking to
              connect with like-minded individuals, LoveDesk is here for you.
            </p>
          </div>
          <div className='col-md-4'>
            <h3>Recent Posts</h3>
            <ul className='list-unstyled'>
              <li>
                <a href='/trending'>Post 1</a>
              </li>
              <li>
                <a href='/trending'>Post 2</a>
              </li>
              <li>
                <a href='#'>Post 3</a>
              </li>
            </ul>
          </div>
          <div className='col-md-4'>
            <h3>Contact Info</h3>
            <ul className='list-unstyled contact-info'>
              <li>
                <i className='fas fa-map-marker-alt'></i> Lagos, Nigeria
              </li>
              <li>
                <i className='fas fa-phone'></i> +1234567890
              </li>
              <li>
                <i className='fas fa-envelope'></i> bummiecarez@gmail.com
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <p>&copy; 2023 LoveDesk. All rights reserved.</p>
            </div>
            <div className='col-md-6'>
              <ul className='list-unstyled footer-links'>
                <li>
                  <a href='/'>Home</a>
                </li>
                <li>
                  <a href='/about'>About</a>
                </li>
                <li>
                  <a href='/'>Contact</a>
                </li>
                <li>
                  <a href='/'>Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
   </div>
  )
}

export default Footer
