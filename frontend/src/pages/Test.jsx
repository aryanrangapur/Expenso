import React, {useState} from "react";
import api from '../services/api'
import './Register.css'

export default function Test({ onSuccess }){
    const [form, setForm] = useState({});
    const [error, setError] = useState('');

    const handleChange = e =>
        setForm(f => ({...f,[e.target.name]: e.target.value}))

    return(
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Register</h2>
            <input type="text" name="username" placeholder="username" onChange={handleChange}/>
            <input type="email" name="email" placeholder="email" onChange={handleChange}/>
            <input type="password" name="username" placeholder="password" onChange={handleChange}/>
            <input type="password" name="username" placeholder="confirm password" onChange={handleChange}/>
            <input type="text" name="first_name" placeholder="first name" onChange={handleChange}/>
            <input type="text" name="last_name" placeholder="last name" onChange={handleChange}/>

            <button type="submit" >SignUp</button>
        </form>
    )
}
