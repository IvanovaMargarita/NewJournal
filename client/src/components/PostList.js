import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';
import {  useNavigate, useParams } from 'react-router-dom'


const PostList = (props) => {
    const [posts,setPosts] = useState([])
    const {id}= useParams()
    const {username}=props

    useEffect(()=>{
        axios.get("http://localhost:8000/api/post/allposts", {withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            setPosts(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    return (
    <div>
        <h3>All Posts</h3>
                    {
                        [...posts].reverse().map((post, index)=>{
                            return (<div key={index}>
                                <div className="card-deck">
                                <div className="card" style={{width:"70%", margin:"0 auto", columnGap:"10px"}}>
                                <div className="card-body">
                                    <h5 className="card-title, text-left">{post.title}</h5>
                                    <img  className="card-img-top" src={post.image} alt={post.name} />
                                    <p className="card-text">{post.caption}</p>
                                    <p className="card-text"><small className="text-muted">created by: {post.createdBy.username}</small></p>
                                    <p className="card-text"><small className="text-muted">created at: {post.date}</small></p>
                                    <Link className="card-link" to={`/postsby/${post.createdBy.username}`} >{post.createdBy.username}</Link>

                                    <Link className="card-link" to={`/post/edit/${post._id}`}> edit</Link>
                                    <Link className="card-link" to={`/post/details/${post._id}`}>details</Link>
                            </div>
                            </div>
                        </div>
                    </div>
                            )
                        })
                    }
        </div>
    )
}

export default PostList