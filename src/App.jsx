import Header from './component/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import SignUp from './pages/SignUp'



function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sign-up" element={<SignUp />} />
        
        </Routes>   
         </div>
  )
}

export default App
