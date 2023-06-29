/* eslint-disable react/prop-types */
import FontAwesome from 'react-fontawesome'
import { excerpt } from '../utility'
import { Link } from 'react-router-dom'

//eslint-disable-next-line react/prop-types
const BlogSection = ({ blogs, user, handleDelete }) => {
  const userId = user?.uid
  return (
    <div className='blog-section'>
      <div className='blog-heading'>Daily Blog</div>

      {/* eslint-disable-next-line react/prop-types */}
      {blogs?.map((item) => (
        <div className='blog-row' key={item.id}>
          <div className='blog-image'>
            <div className='hover-blogs-img'>
              <div className='blogs-img'>
                <img src={item.image} alt={item.title} />
              </div>
              <div></div>
            </div>
          </div>
          <div className='blog-content'>
            <div className='text-start'>
              <h6 className='category'>{item.category}</h6>
              <span className='title py-2'>{item.title}</span>

              <div className='meta-info'>
                <p className='author'>{item.author}</p> -&nbsp;
                {item.timestamp.toDate().toDateString()}
              </div>
              {excerpt(item.description, 120)}
            </div>
            <Link to={`/detail/${item.id}`}>
              <button className='btn btn-read'>Read More</button>
            </Link>
            {user && user.uid === userId && (
              <div className='edit-icons'>
                <FontAwesome
                  name='trash'
                  className='icon-trash'
                  onClick={() => handleDelete(item.id)}
                />
                <Link to={`/update/${item.id}`}>
                  <FontAwesome name='edit' className='icon-edit' />
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default BlogSection


