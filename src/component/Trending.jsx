import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

import { Link } from 'react-router-dom'
import './Trending.css'


// eslint-disable-next-line react/prop-types
const Trending = ({ blogs }) => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  }
  return (
    <>
      <div className='blog-heading text-start mb-4 py-2'>Trending</div>
      <OwlCarousel className='owl-theme' {...options}>
        {/* eslint-disable-next-line react/prop-types */}
        {blogs?.map((item) => (
          <div className='item px-2' key={item.id}>
            <Link to={`/detail/${item.id}`}>
              <div className='trending-img-position'>
                <div className='trending-img-size'>
                  <img
                    src={item.image}
                    alt={item.title}
                    className='trending-img-relative'
                  />
                </div>
                <div className='trending-img-absolute'></div>
                <div className='trending-img-absolute-1'>
                  <span className='text-white'>{item.title}</span>
                  <div className='trending-meta-info'>
                    {item.author} - {item.timestamp.toDate().toDateString()}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </OwlCarousel>
    </>
  )
}

export default Trending
