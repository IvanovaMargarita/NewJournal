import React from 'react'
import { Link } from 'react-router-dom'
import {  useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import styles from '../static/Nav.module.css'

const Nav = () => {
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
        <>
        <nav>
            <div className="nav justify-content-center">
                {/* <h1 id="nav-h1"className="nav-title">Jounrnal App</h1> */}
                    <ul className="nav">
                        <li class="nav-item"><Link class="nav-link" to ={"/createpost"}> Create a Post </Link></li>
                        <li class="nav-item"><Link class="nav-link" to ={"/displayall"}> All Posts </Link></li>
                        <li class="nav-item"><button type="button" class="btn btn-secondary btn-sm" onClick={logout}> logout</button></li>
                    </ul>
            </div>
        </nav>


        </>
    )
}

export default Nav 



