/* eslint-disable no-undef */
import Rain from '../../assets/love5.jpg'
import { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'

import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import './Home.css'
import BlogSection from '../../component/BlogSection'
import Spinner from '../../component/Spinner'
import { deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Tags from '../../component/Tags'
import MostPopular from '../../component/MostPopular'
import Trending from '../../component/Trending'
import Footer from '../../component/Footer'

// eslint-disable-next-line react/prop-types
const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true)
  const [blogs, setBlogs] = useState([])
  const [tags, setTags] = useState([])
  const [trendBlogs, setTrendBlogs] = useState([])

  const getTrendingBlogs = async () => {
    const blogRef = collection(db, 'loveDeskBlogs')
    const trendQuery = query(blogRef, where('trending', '==', 'yes'))
    const querySnapshot = await getDocs(trendQuery)
    let trendBlogs = []
    querySnapshot.forEach((doc) => {
      trendBlogs.push({ id: doc.id, ...doc.data() })
    })
    setTrendBlogs(trendBlogs)
  }
  useEffect(() => {
    getTrendingBlogs()
    const unsub = onSnapshot(
      collection(db, 'loveDeskBlogs'),
      (snapshot) => {
        let list = []
        let tags = []

        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get('tags'))
          list.push({ id: doc.id, ...doc.data() })
        })
        const uniqueTags = [...new Set(tags)]
        setTags(uniqueTags)
        setBlogs(list)
        setLoading(false)
        setActive('home')
      },
      (error) => {
        console.log(error)
      }
    )
    return () => {
      unsub()
      getTrendingBlogs()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) {
    return <Spinner />
  }
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure wanted to delete that blog ?')) {
      try {
        setLoading(true)
        await deleteDoc(doc(db, 'loveDeskBlogs', id))

        toast.success('Blog deleted successfully')
        setLoading(false)


        
      } catch (err) {
        console.log(err)
      }
    }
  }
  console.log('blogs', blogs)
  return (
    <div className='home-bg'>
      <div className='hero '>
        <div className='hero-image'>
          <img src={Rain} alt='flower' />
        </div>
        <div className='hero-text'>
          <h1>Welcome to LoveDesk! </h1>
          <h4>
            {' '}
            Unleash the power of love and good relationships through the
            transformative magic of written words
          </h4>
          <Link to='/auth'>
            <button className='btn'>Get started</button>
          </Link>
        </div>
      </div>
      <section className='container'>
        <div className='text-center'>
          <Trending blogs={trendBlogs} />
        </div>
        <div className='flex'>
          <div className='col-md-8'>
            <BlogSection
              blogs={blogs}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          <div className='col-md-3'>
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home
