import axios from "axios"
import { useState } from "react";
import './LoginForm.css'
import { useNavigate } from "react-router-dom";

function SignupForm({setAuth}) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/users/register', {
            "email":email,
            "username":username,
            "hashPassword":password
        })
        setAuth({username:username, isLoggedIn:true});
        navigate('/');
    }

    return (
        <>
        <form action="post" onSubmit={handleSubmit}>
            <h2>Sign up</h2>

            <label htmlFor="username">Username</label>
            <input type="text" name="username"
                onChange={(e) => setUsername(e.target.value)}/>

            <label htmlFor="email">E-mail</label>
            <input type="text" name="email"
                onChange={(e) => setEmail(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password"
                onChange={(e) => setPassword(e.target.value)}/>

            <input type="submit" value="Sign up" className="submit-button"/>
        </form>
        </>
    )
}

export default SignupForm