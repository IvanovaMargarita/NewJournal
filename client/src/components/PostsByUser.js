import React from 'react'
import axios from 'axios'
import { useState , useEffect} from 'react'
import {  Link,  useParams } from 'react-router-dom'


const PostsByUser = (props) => {
    const [allPosts, setAllPosts]=useState([])
    const {username}=useParams()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/post/${username}`, {withCredentials:true})
        .then(response=>{
            console.log(response.data)
            setAllPosts(response.data)
        })
        .catch(err=>console.log(err))

    },[])
    return (
    <div>
        {/* <h2>posts by :{post.createdBy.username}</h2> */}
        {
            [...allPosts].reverse().map((post, index)=>{
                return (<div key ={index}>
                            <div className="card-deck">
                            <div className="card" style={{width:"70%", margin:"0 auto", columnGap:"10px"}}>
                            <div className="card-body">
                                <h5 className="card-title, text-left">{post.title}</h5>
                                <img  className="card-img-top" src={post.image} alt={post.name} />
                                <p className="card-text">{post.caption}</p>
                                <Link className='card-link' to={`/postsby/${username}`} >{post.createdBy.username}</Link>
                                {/* <p className="card-text"><small className="text-muted">created by: {post.createdBy.username}</small></p> */}
                                <p className="card-text"><small className="text-muted">created at: {post.date}</small></p>
                                <Link className='card-link' to={`/post/edit/${post._id}`}> edit</Link>
                                <Link className='card-link' to={`/post/details/${post._id}`}>details</Link>
                            </div>
                            </div>
                            </div>
                </div>)
            })
        }




    </div>
  )
}

export default PostsByUser