import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = () => {
    const navigate = useNavigate()
    const redirectToHome = async()=>{
        try {
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      redirectToHome()
    }, [])
    
  return (
    <div>
        <p>String</p>
        <p>Redirect</p>
    </div>
  )
}

export default Redirect