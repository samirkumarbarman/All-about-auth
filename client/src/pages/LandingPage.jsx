import React from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="text-center p-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Welcome</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default LandingPage;
