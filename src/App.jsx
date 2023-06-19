import Header from './component/Header/Header'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import About from './pages/about/About.jsx'
import Detail from './pages/Detail.jsx'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import SignUp from './pages/SignUp'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './pages/Auth'
// import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallBack'
// import { useNavigate } from 'react-router-dom'

function App() {
  const [active, setActive] = useState('home')
  const [user, setUser] = useState(null)

  // const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} />
      <Header setActive={setActive} active={active} user={user} />
      <ToastContainer position='top-center' />
      <Routes>
        <Route
          path='/'
          element={
            <Home
              setActive={setActive}
              active={active}
              setUser={setUser}
              user={user}
            />
          }
        />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/create' element={<Blog />} />
        <Route path='/update/:id' element={<Blog />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
      <ErrorBoundary FallbackComponent={ErrorFallback}></ErrorBoundary>
    </div>
  )
}

export default App
