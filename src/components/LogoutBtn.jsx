import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import authService from '../appwrite/auth'

function LogoutBtn() {
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button className="text-white text-sm transition-all hover:bg-red-700 px-4 py-2 rounded-full bg-red-600"
    onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutBtn
