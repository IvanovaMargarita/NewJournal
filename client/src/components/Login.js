import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState("")
    const [confirmLogin, setConfirmLogin]=useState("")
    const navigate = useNavigate()
    
    const login = (event)=>{
        event.preventDefault()
        axios.post("http://localhost:8000/api/login",{
            email: email,
            password: password
        },{withCredentials:true})
        .then(res=>{
            console.log(res, "res")
            console.log(res.data, "is res data")
            setConfirmLogin("You are logged in!")
            setErrors("")
            navigate("/displayall")
        })
        .catch(err=>{
            console.log(err)
            setErrors(err.response)
        })
    }
    
    return (
        <div className='form-group'>

        <form  className="text-center border border-light p-5 col-6 mx-auto" onSubmit={login} 
        >
                <p className="h4 mb-4">Sign in</p>

            <div>
                {errors ? (
                    <span className='error-text'>{errors.data.message}</span>
                ) : null }
                <input type="text"name="email" 
                    className="form-control mb-4"   placeholder="email"
                    value={email} onChange = {(e)=>setEmail(e.target.value)}/>

            </div>
            <div>
                {errors ? (
                    <span className='error-text'>{errors.data.message}</span>
                ) : null }
                <input type="password" name="password"
                    className="form-control mb-4" placeholder="password"
                    value={password} onChange = {(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-info btn-block my-4" style={{margin:"10px"}}>Submit</button>
        <p>not a member yet? <Link to="/register">Register</Link></p>
        </form>
        </div>
    )
}

export default Login