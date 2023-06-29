import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
// import "./Detail.css"
import Tags from '../component/Tags'
import MostPopular from '../component/MostPopular'
// import Header from "../component/Header/Header"

// eslint-disable-next-line react/prop-types, no-unused-vars
const Detail = ({ setActive }) => {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [tags, setTags] = useState([])
  useEffect(() => {
    const getBlogsData = async () => {
      const blogRef = collection(db, 'loveDeskBlogs')
      const blogs = await getDocs(blogRef)
      setBlogs(blogs.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      let tags = []
      blogs.docs.map((doc) => tags.push(...doc.get('tags')))
      let uniqueTags = [...new Set(tags)]
      setTags(uniqueTags)
    }
    getBlogsData()
  }, [])
  useEffect(() => {
    id && getBlogDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const getBlogDetail = async () => {
    const docRef = doc(db, 'loveDeskBlogs', id)
    const blogDetail = await getDoc(docRef)
    setBlog(blogDetail.data())
    setActive(null)
  }
  return (
    <div className='detail-top'>
      <div className='single'>
        <div
          className='blog-title-box'
          style={{ backgroundImage: `url('${blog?.image}')` }}
        >
          <div className='overlay'></div>
          <div className='blog-title'>
            <span>{blog?.timestamp.toDate().toDateString()}</span>
            <h2>{blog?.title}</h2>
          </div>
        </div>
        <div className='container-fluid padding pb-4 pt-4 blog-single-content'>
          <div className='container padding'>
            <div className='row mx-0'>
              <div className='col-md-8'>
                <span className='meta-info'>
                  By &nbsp; <p className='author'>{blog?.author}</p> -&nbsp;
                  {blog?.timestamp.toDate().toDateString()}
                </span>
                <p className='text-start'> {blog?.description} </p>
              </div>
              <div className='col-md-3'>
                <Tags tags={tags} />
                <MostPopular blogs={blogs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
