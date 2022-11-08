import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const PostForm = (props) => {
    const [posts,setPosts] =useState([])
    const[title,setTitle]=useState("")
    const [caption, setCaption]= useState("")
    const [image, setImage]=useState("")
    const navigate = useNavigate()

    const onSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/post",{title,caption,image},{withCredentials:true})
        .then(response=>{
            console.log(response.data)
            setPosts([...posts,response.data])
            navigate("/displayall")
        })
        .catch(err=>console.log(err))

    }

  return (
    <div className='form-group'>
        <form onSubmit={onSubmit} className="text-center border border-light p-4 col-10 mx-auto">
        <p className="h4 mb-4">Create a Post</p>

            <textarea className="form-control"  rows="1" placeholder='Add title'
                        type="text" name="title" value={title} 
                        onChange={(e)=>setTitle(e.target.value)}/>

            <textarea className="form-control"  rows="7" placeholder='Write something'
                    type="text" name="caption" value={caption} 
                    onChange={(e)=>setCaption(e.target.value)}/>

            <textarea className="form-control"  rows="1"placeholder='Add link to an image'
                    type="text" name="image" id="image" value={image} 
                    onChange={(e)=>setImage(e.target.value)}/>

        <input type="submit" />
        </form>
    
    </div>
  )
}

export default PostForm