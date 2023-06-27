import { useNavigate } from "react-router-dom"
import './MostPopular.css'



//eslint-disable-next-line react/prop-types
const MostPopular = ({blogs}) => {
 const navigate = useNavigate()
  return (
    <div>
      <div className='blog-heading text-start pt-3 py-2'>Most Popular</div>
      {/* eslint-disable-next-line react/prop-types */}
      {blogs?.map((item) => (
        <div className='row pb-3' key={item.id} style={{cursor:"pointer"}} onClick={() => navigate(`/detail/${item.id}`)}>
          <div className='col-md-4 align-self-center'>
            <img
              src={item.image}
              alt={item.title}
              className='most-popular-img'
            />
          </div>
          <div className='col-7 padding'>
            <div className='text-center most-popular-font'>{item.title}</div>
            <div className='text-center most-popular-font-meta'>
              {' '}
              {item.timestamp.toDate().toDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MostPopular