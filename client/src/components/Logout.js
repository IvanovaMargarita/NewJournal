import React from 'react'
import axios from 'axios'
import {  useNavigate, useParams } from 'react-router-dom'



const Logout = () => {

  const navigate = useNavigate()

  const logout = (e) =>{
    axios.get('http://localhost:8000/api/logout',
        {withCredentials:true})
    .then((res)=>{
        console.log('logged out')
        navigate("/")
    }).catch((err)=>{
        // console.log(err)
    })
  }
  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default Logout;