import React from 'react'
import axios from 'axios'
import { useState ,useEffect} from 'react'
import {useParams,Link,Navigate, useNavigate} from 'react-router-dom'


const OnePost = (props) => {
    const[post,setPost]=useState([])
    const {id}= useParams()
    const {username}=props

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/post/edit/${id}`,{withCredentials:true})
            .then(res=>{
                console.log(res.data)
                setPost(res.data)
            })
            .catch(err=>console.log(err))
    },[id])
  return (
    <div>
        <div>
            <p>{post.title}</p>
            <p>{post.caption}</p>
            <img src={post.image} alt={post.name} />
        </div>
    </div>
  )
}

export default OnePost