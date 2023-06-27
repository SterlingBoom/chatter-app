import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db, storage } from '../../firebase'
import { ref } from 'firebase/storage'
import ReactTagInput from '@pathofdev/react-tag-input'
import '@pathofdev/react-tag-input/build/index.css'
import './Blog.css'

import { getDownloadURL, uploadBytesResumable } from 'firebase/storage'
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'

import { doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const initialState = {
  title: '',
  tags: [],
  trending: 'no',
  category: '',
  description: '',
}
const categoryOptions = [
  'Love',
  'Life',
  'Relationship',
  'Friendship',
  'Family',
  'breakup',
  'heartbreak',
  'loneliness',
  'inspiration',
]

//eslint-disable-next-line react/prop-types
const Blog = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState)
  // eslint-disable-next-line no-unused-vars
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState(null)
  const { id } = useParams()
  const navigate = useNavigate()

  const { title, tags, trending, category, description } = form

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')

          setProgress(progress)
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
            default:
              break
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            toast.info('Image uploaded to firebase successfully')
            setForm((prev) => ({ ...prev, image: downloadURL }))
          })
        }
      )
    }
    file && uploadFile()
  }, [file])

  useEffect(() => {
    id && getBlogDetail()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const getBlogDetail = async () => {
    const docRef = doc(db, 'loveDeskBlogs', id)
    const snapshot = await getDoc(docRef)
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() })
    }
    setActive('null')
  }

  const handleChange = (e) => {
    e.preventDefault()
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTags = (tags) => {
    setForm({ ...form, tags })
  }
  const handleTrending = (e) => {
    setForm({ ...form, trending: e.target.value })
  }
  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (category && tags && title && description && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, 'loveDeskBlogs'), {
            ...form,
            timestamp: serverTimestamp(),

            // eslint-disable-next-line react/prop-types
            author: user.displayName,
            // eslint-disable-next-line react/prop-types
            userId: user.uid,
          })
          toast.success('Blog created successfully')
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await updateDoc(doc(db, 'loveDeskBlogs', id), {
            ...form,
            timestamp: serverTimestamp(),
            // eslint-disable-next-line react/prop-types
            author: user.displayName,
            // eslint-disable-next-line react/prop-types
            userId: user.uid,
          })
          toast.success('Blog updated successfully')
        } catch (err) {
          console.log(err)
        }
      }
    } else {
      return toast.error('All fields are mandatory to fill')
    }

    navigate('/')
  }

  const categoryOption = categoryOptions
  return (
    <div className='blog-form'>
      {/* <div className='text-center heading py-2'> */}
      <h2 className='blog-form-title'>{id ? 'Update Blog' : 'Create Blog'}</h2>
      {/* </div> */}

      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Title'
            name='title'
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className=''>
          <ReactTagInput tags={tags} placeholder='Tags' onChange={handleTags} />
        </div>

        <p className='trending'>Is it trending blog ? &nbsp; </p>
        <div className='form-check-inline'>
          <input
            type='radio'
            className='form-check-input'
            value='yes'
            id='trending-yes'
            name='radioOption'
            checked={trending === 'yes'}
            onChange={handleTrending}
          />
          <label htmlFor='radioOption' className='form-check-label'>
            Yes&nbsp;
          </label>
        </div>
        <div className='form-check-inline'>
          <input
            type='radio'
            className='form-check-input '
            id='trending-no'
            value='no'
            name='radioOption'
            checked={trending === 'no'}
            onChange={handleTrending}
          />
          <label htmlFor='radioOption' className='form-check-label'>
            No
          </label>
        </div>

        <div>
          <select
            value={category}
            onChange={onCategoryChange}
            className='catg-dropdown'
          >
            <option>Please select category</option>

            {categoryOption.map((option, index) => (
              <option value={option || ''} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className='col-12 py-3'>
          <textarea
            className='form-control description-box'
            placeholder='Description'
            value={description}
            name='description'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <input
            type='file'
            className='form-control'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className='col-12 py-3 text-center'>
          <button
            className='btn btn-add'
            type='submit'
            // disabled={progress !== null && progress < 100}
          >
            {id ? 'Update' : 'Submit'}
          </button>
         
        </div>
      </form>
    </div>
  )
}

export default Blog
