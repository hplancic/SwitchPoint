import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({setAuth}) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        axios.get('api/users')
        .then(response => response.data)
        .then(json => {
            let valid = false;
            json.forEach(obj => {
                let validUsername = obj.username == username;
                let validPassword = obj.hashPassword == password;
                if (validUsername && validPassword) valid = true;
                })
            if (valid) {
                const info = {
                    'isLoggedIn': true,
                    'username':username
                }
                setAuth(info);
                navigate('/', {replace: true})
            } else {
                document.getElementById('invalid-login-text').style.display = 'block';
            }
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
            <input type="text" name="password"
                onChange={(e) => setPassword(e.target.value)}/>

            <h5 id="invalid-login-text">Invalid username or password.</h5>

            <input type="submit" value="Log in" className="submit-button"/>
        </form>
        </>
    )
}

export default LoginForm