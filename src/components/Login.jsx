import React, { useState } from 'react';
import {Link} from 'react-router-dom'; 
import axios from 'axios';
import "../styles/login.css"

const initialValues = {
    username:"",
    password:""
};

export default function Login() {
    const [formValues, setFormValues] = useState(initialValues);


    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post ('https://anywhere-fitness-bwft5.herokuapp.com/api/auth/login', formValues)
        .then((res) => {
            window.localStorage.setItem('token', res.data.token);
            login()
        })
        .catch(err => {
            console.log(err.message);
        })
        .finally(() => {
            setFormValues(formValues)
        })
    };
    const login = () => {
        axios.get('https://anywhere-fitness-bwft5.herokuapp.com/api/classes/:id')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    

    return (
        <>
            <div id="card-content">
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="login-form-header">
                        <h1>Login to view your classes.</h1>
                        {/* <p>Don't have a login? <Link id="signup" to="/signup">Create one!</Link></p> */}
                    </div>

                    <div className="login-input-container">
                        <div className='form-inputs' id='login-inputs'>
                            <label>Username:
                            <input
                                value={formValues.username}
                                name="username"
                                type="text"
                                onChange={handleChange}
                            /></label>

                            <label>Password:
                            <input
                                value={formValues.password}
                                name="password"
                                type="password"
                                onChange={handleChange}
                            /></label>
                        </div>

                        
                        <Link to={`/dashboard`}>

                        <button id="login-button">Login</button>
                        </Link>

                        <Link to={`/signup`}>
                        Don't have an account yet?</Link>
                    </div>
                </form>
            </div>
        </>
    )
}