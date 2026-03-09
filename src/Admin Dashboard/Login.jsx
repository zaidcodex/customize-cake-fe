import React, { useState, useEffect, useContext } from 'react'
import { useHistory} from "react-router-dom";
import AppContext from '../Context/appContext';

const Login = () => {
  const context = useContext(AppContext)
  const {loggedIn,authToken} = context;
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()


  useEffect(() => {
    const authToken = localStorage.getItem("authToken")
    if(authToken){
    history.push("/admin-dashboard/categories")
    }
  }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()
    await loggedIn({ email, password })
    const authToken = localStorage.getItem("authToken")
    if(authToken){
    history.push("/admin-dashboard/categories")
    }
    console.log('Login:', { email, password })
    // Add your login logic here
  }



  return (
    <div className='min-vh-100 d-flex align-items-center justify-content-center' style={{ backgroundColor: '#fff' }}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-5 col-lg-4'>
            <div className='card shadow-lg border-0' style={{ borderRadius: '15px' }}>
              <div className='card-body p-5'>
                {/* Logo or Title */}
                <div className='text-center mb-4'>
                  <h2 className='fw-bold' style={{ color: '#FDACAC' }}>Welcome Back</h2>
                  <p className='text-muted'>Login to your account</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                  {/* Email Input */}
                  <div className='mb-3'>
                    <label htmlFor='email' className='form-label fw-semibold' style={{ color: '#333' }}>
                      Email Address
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      id='email'
                      placeholder='Enter your email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        borderColor: '#FDACAC',
                        padding: '12px',
                        borderRadius: '8px'
                      }}
                    />
                  </div>

                  {/* Password Input */}
                  <div className='mb-3'>
                    <label htmlFor='password' className='form-label fw-semibold' style={{ color: '#333' }}>
                      Password
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      id='password'
                      placeholder='Enter your password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        borderColor: '#FDACAC',
                        padding: '12px',
                        borderRadius: '8px'
                      }}
                    />
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className='d-flex justify-content-between align-items-center mb-4'>
                    <div className='form-check'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        id='remember'
                        style={{ borderColor: '#FDACAC' }}
                      />
                      <label className='form-check-label text-muted' htmlFor='remember'>
                        Remember me
                      </label>
                    </div>
                    <a href='#' className='text-decoration-none' style={{ color: '#FDACAC', fontSize: '14px' }}>
                      Forgot Password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    type='submit'
                    className='btn w-100 text-white fw-semibold'
                    style={{
                      backgroundColor: '#FDACAC',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#fc9a9a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#FDACAC'}
                  >
                    Login
                  </button>
                </form>



            
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login