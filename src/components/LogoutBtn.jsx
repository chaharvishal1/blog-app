import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'
import authService from '../appwrite/auth'

function LogoutBtn() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    authService.logout().then(() => {
        dispatch(logout())
    }) 
  }

  return (
    <button className="text-white text-sm transition-all hover:bg-red-700 px-4 py-2 rounded-full bg-red-600"
    onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutBtn
