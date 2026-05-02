import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children , authentication = true}) => {

  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let authVal = authStatus ? true : false;
    if (authentication && authVal) {
      navigate('/login');
    } else if (!authentication && authVal) {
      navigate('/');
    }
    setLoading(false);
  }, [authStatus, authentication, navigate])

  return (
    loading ? <div>Loading...</div> : <>{children}</>
  )
}

export default AuthLayout
