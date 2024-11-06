import { useState } from "react";

function LoginForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("login", username, password)
/*         axios.post('/api/users', {
            "email":email,
            "username":username,
            "location":location,
            "hashPassword":password
        })
        console.log("submit", username, email, location, password)
 */    }


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

            <input type="submit" value="Log in" className="submit-button"/>
        </form>
        </>
    )
}

export default LoginForm