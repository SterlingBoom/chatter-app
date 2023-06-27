import Header from './component/Header/Header.jsx'
import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import About from './pages/about/About.jsx'
import Detail from './pages/Detail.jsx'
import Contact from './pages/Contact'
import Blog from './pages/blog/Blog'
import SignUp from './pages/SignUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './pages/Auth'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './ErrorFallBack'
import { useNavigate } from 'react-router-dom'
import NotFound from './component/NotFound'
import Footer from './component/Footer.jsx'

const App = () => {
  const [active, setActive] = useState('home')
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      } else {
        setUser(null)
      }
    })
  }, [])
  const handleLogOut = () => {
    signOut(auth).then(() => {
      setUser(null)
      setActive('login')
      navigate('/')
    })
  }
  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header
          setActive={setActive}
          active={active}
          setUser={setUser}
          user={user}
          handleLogOut={handleLogOut}
        />
        <ToastContainer position='top-center' />
        <Routes>
          <Route
            path='/'
            element={<Home setActive={setActive} active={active} user={user} />}
          />
          <Route path='/about' element={<About />} />
          <Route
            path='/auth'
            element={<Auth setActive={setActive} setUser={setUser} />}
          />
          <Route path='/auth' element={<Auth />} />
          <Route
            path='/detail/:id'
            element={<Detail setActive={setActive} active={active} />}
          />
          <Route path='/contact' element={<Contact />} />
          <Route
            path='/create'
            element={user?.uid ? <Blog user={user} /> : <Navigate to='/' />}
          />
          <Route
            path='/update/:id'
            element={
              user?.uid ? (
                <Blog user={user} setActive={setActive} />
              ) : (
                <Navigate to='/' />
              )
            }
          />
          <Route path='*' element={<NotFound />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Routes>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}

export default App
