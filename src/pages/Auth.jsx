import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../firebase'
import { useNavigate } from 'react-router-dom'


const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

// eslint-disable-next-line react/prop-types
const Auth = () => {
  
  const [state, setState] = useState(initialState)
  const [signUp, setSignUp] = useState(false)
  
  
  const { email, password, firstName, lastName, confirmPassword } = state
  const navigate = useNavigate()

  const handleChange = (e) => {
    e.preventDefault()
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    if (!signUp) {
      if(email && password){
        const { user } = await signInWithEmailAndPassword(auth, email, password)
      // toast.success('User logged in successfully')
        navigate('/')

        // eslint-disable-next-line react/prop-types
        // setActive('home')
      }else{
        toast.error('Please fill all the fields')
      }
      //eslint-disable-next-line no-unused-vars
    } else {
      if (password !== confirmPassword) {
        toast.error('Password does not match')
      }
      if (firstName && lastName && email && password) {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

        await updateProfile(user, { displayName: `${firstName} ${lastName}` })
    

        // eslint-disable-next-line react/prop-types
        // setActive('home')
      } else {
        return toast.error('Please fill all the fields')
      }
    }
toast.success('User created successfully')
    navigate('/')
  }

  return (
    <div className='sign-in'>
      <div className='text-center'>
        <div className='text-center'>
          {!signUp ? (
            <h1 className='sign-in-title'>Sign-in</h1>
          ) : (
            <h1 className='sign-up-title'>Sign-up</h1>
          )}
        </div>
      </div>
      <form onSubmit={handleAuth}>
        {signUp && (
          <div className='flex'>
            <div className='form-group'>
              <label htmlFor='first name'>First Name</label>
              <input
                type='text'
                placeholder='First Name'
                id='firstName'
                name='firstName'
                value={firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className='form-group'>
              <label htmlFor='Last name'>last Name</label>
              <input
                type='text'
                placeholder='Last Name'
                id='lastName'
                name='lastName'
                value={lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            placeholder='Enter your email'
            id='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            placeholder='Enter your password'
            id='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        {signUp && (
          <>
            <div className='form-group'>
              <label htmlFor='Confirm Password'>Confirm Password</label>
              <input
                type='password'
                placeholder=' Confirm your password'
                id='confirmPassword'
                name='confirmPassword'
                value={confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className='form-group'>
          <button
            className={'btnn ${!signUp ? "btn-sign-in" : "btn-sign-up"}'}
            type='submit'
          >
            {!signUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </form>
      <div>
        {!signUp ? (
          <>
            <div>
              <p>
                Dont have an account? &nbsp;
                <span
                  className='sign-up-cursor'
                  onClick={() => setSignUp(true)}
                >
                  Sign up
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>
                Already have an account? &nbsp;
                <span
                  className='sign-up-cursor'
                  onClick={() => setSignUp(false)}
                >
                  Sign in
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Auth
