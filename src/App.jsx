import { useState, useEffect } from 'react'
import './App.css'
import authService from './appwrite/auth'
import {login, logout} from "./store/authSlice";
import {useDispatch} from "react-redux";
import {Footer, Header} from "./components/index.jsx";
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        const safeUserData = JSON.parse(JSON.stringify(userData));
        dispatch(login(safeUserData));
      }
      else{
        dispatch(logout())
      }
    })
    .catch((error) => {      
      console.error('Error fetching user data:', error)
      dispatch(logout())
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <>
      <div className='min-h-screen flex flex-col bg-gray-400'>
        <Header />
        <h1 className='text-3xl font-bold underline text-center py-4 px-4'>Welcome to the App</h1>
          <main className='flex-1'>
            <Outlet />
          </main>
        <Footer />
      </div>
    </>
  ) : (
    <div className="App">
      <h1>Loading...</h1>
    </div>
  )
}

export default App
