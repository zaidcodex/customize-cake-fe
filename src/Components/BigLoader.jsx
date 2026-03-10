import React, { useContext } from 'react'

import logo from '../images/logo.png'
import AppContext from '../Context/appContext'

export default function BigLoader() {
  const { globalLoader } = useContext(AppContext)
  if (!globalLoader) return null
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(255,255,255,0.9)', zIndex: 9999 }}>
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <img src={logo} alt="Glasses4U" style={{ width: 140 }} />
          <div className="mt-4">
            <div className="spinner-border" style={{ width: 58, height: 58, color: '#ec8c97' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

