import React,{useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



const Register = (props) => {

    const [confrimReg, setCofirmReg] = useState("")
    const [errors,setErrors]=useState({})
    const [user,setUser]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    //spreading a user to access its value pairs
    const handleChange = (e)=>{
        setUser({
            ...user,[e.target.name]: e.target.value
        })
    }

    const register=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:8000/api/register",
        user,
        {withCredentials:true})//make sure this comes after anything that is sent in
        .then((res)=>{
            console.log(res.data)
            setUser({
                username:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            setCofirmReg("Thank you for registering, you can now login!")
            setErrors({})
        })
        .catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })

    }


    return (
        <div className='form-group'>

            {confrimReg ? <h4 style={{color:"green"}}>{confrimReg}</h4> : null}
        <form onSubmit={register} className="text-center border border-light p-5 col-6 mx-auto">
        <p className="h4 mb-4">Register</p>
            <div>
                {errors.username ? (
                    <span className='error-text'>{errors.username.message}</span>
                ) : null }
                <input type="text" name="username" className="form-control mb-4"  placeholder="username"
                    value={user.username} onChange = {handleChange}/>
            </div>
            <div>
                {errors.email ? (
                    <span className='error-text'>{errors.email.message}</span>
                ) : null }
                <input type="text"  name="email"
                    className="form-control mb-4" placeholder="email"
                    value={user.email} onChange = {handleChange}/>
            </div>
            <div>
                {errors.password ? (
                    <span className='error-text'>{errors.password.message}</span>
                ) : null }
                <input type="password" name="password" placeholder="password"
                    className="form-control mb-4"
                    value={user.password} onChange = {handleChange}/>
            </div>
            <div>
                {errors.confirmPassword ? (
                    <span className='error-text'>{errors.confirmPassword.message}</span>
                ) : null }
                <input type="password" name="confirmPassword"  placeholder="confrim password"
                    className="form-control mb-4"
                    value={user.confirmPassword} onChange = {handleChange}/>
            </div>
            <p><button type="submit" className="btn btn-info btn-block my-4"style={{margin:"10px"}}>Submit</button>
        <Link to="/">go back</Link></p>
        </form>

        </div>
    )
}

export default Register