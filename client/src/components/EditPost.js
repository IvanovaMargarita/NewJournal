import React, { useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {  useNavigate, useParams } from 'react-router-dom'
import DeletePost from './DeletePost'


const EditPost = (props) => {
    const[title,setTitle]=useState("")
    const [caption, setCaption]= useState("")
    const [image, setImage]=useState("")
    const navigate = useNavigate()
    const {id}= useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/post/edit/${id}`, {withCredentials:true})
        .then(response=>{
            console.log(response.data)
            setCaption(response.data.caption)
            setImage(response.data.image)
            setTitle(response.data.title)
        })
        .catch(err=>console.log(err))

    },[id])
    console.log(title)
    const onSubmitHandler=(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/post/edit/${id}` ,{title:title,caption:caption, image:image},{withCredentials:true}
        )
            .then(res=>{
                console.log(res)
                navigate("/displayall")
            })
            .catch((err)=>{
                console.log(err)
                // setErrors(err.response.data.err.errors)
            })
    }

    const deleteHandler =()=>{
        axios.delete(`http://localhost:8000/api/post/${id}`,{withCredentials:true})
            .then(response=>{
                console.log("this pet is deleted", response)
                navigate("/displayall")


            })
            .catch((err)=>{
                console.log("deleting post", err.response)
            })
        }
    
  return (
    <div className='form-group'>
        <form onSubmit={onSubmitHandler} className="text-center border border-light p-4 col-10 mx-auto">
        <p className="h4 mb-4">Edit your post</p>

            <label htmlFor="title">title</label>
            <textarea type="text" name="title" className="form-control"  rows="1" 
                    value={title} onChange={(e)=>setTitle(e.target.value)} ></textarea>

            <label htmlFor="caption">text</label>
            <textarea type="text" name="caption" className="form-control"  rows="1" 
                    value={caption}
                onChange={(e)=>setCaption(e.target.value)}/>
                
            <label htmlFor="image">image</label>
            <input className="form-control"  rows="1" type="text" name="caption" value={image}
                onChange={(e)=>setImage(e.target.value)}/>
        <input type="submit" />
        </form>
        <button className="btn btn-info btn-block my-4"style={{margin:"10px"}} onClick={deleteHandler}>delete</button>
        
    </div>
  )
}


export default EditPost