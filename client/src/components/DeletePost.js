import axios from 'axios'
import React, { useEffect, useState} from 'react'
import {useParams,Link,Navigate, useNavigate} from 'react-router-dom'

const DeletePost = (props) => {
    const [post,setPost]=useState({})
    const {id}= useParams()
    const navigate = useNavigate()

    const deleteHandler =(deletedId)=>{
        axios.delete(`http://localhost:8000/api/post/${deletedId}`, {withCredentials:true})
            .then(response=>{
                console.log("this pet is deleted", response)
                navigate("/displayall")


            })
            .catch((err)=>{
                console.log("deleting pet", err.response)
            })
  return (
    <div>
        <button onClick={()=>deleteHandler(post._id)}>delete</button>
    </div>
  )
}
}

export default DeletePost;