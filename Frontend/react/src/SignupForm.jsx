import axios from "axios"
import { useState } from "react";

function SignupForm() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/api/users/register', {
            "email":email,
            "username":username,
            "location":location,
            "hashPassword":password
        })
        console.log("submit", username, email, location, password)
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

            <label htmlFor="location">Location</label>
            <input type="text" name="location"
                onChange={(e) => setLocation(e.target.value)}/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password"
                onChange={(e) => setPassword(e.target.value)}/>

            <input type="submit" value="Sign up" className="submit-button"/>
        </form>
        </>
    )
}

export default SignupForm