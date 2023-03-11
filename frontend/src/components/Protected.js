import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Protected({Component}) {

  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("key")

    console.log(token);
    if (!token) {
        navigate('/login')
    } else {
        navigate('/socket')
    }
  
  }, [navigate])

  return (
    <Component />
  )
}

export default Protected