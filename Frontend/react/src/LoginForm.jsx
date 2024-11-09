import { useEffect, useState } from "react";
import './LoginForm.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({setAuth}) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        
        let path = '/api/auth/login?username=' + username + '&password=' + password;
        axios.post(path)
            .then(response => {
                setAuth({username:username, isLoggedIn:true});
                navigate('/')
            })
            .catch(error => {
                let invalid = document.getElementById('invalid-login-text');
                invalid.style.display = 'block';
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        login();
    }

    return (
        <>
        <form action="post" onSubmit={handleSubmit}>
            <h2>Log in</h2>

            <label htmlFor="username">Username</label>
            <input type="text" name="username"
                onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password"
                onChange={(e) => setPassword(e.target.value)}/>

            <h5 id="invalid-login-text">Invalid username or password.</h5>

            <input type="submit" value="Log in" className="submit-button"/>
        </form>
        </>
    )
}

export default LoginForm