import axios from "axios"
import { useState } from "react";
import '../styles/LoginForm.css'
import { useNavigate } from "react-router-dom";
import Map from "./Map.jsx";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[0-9A-Za-z]{6,16}$/;

function SignupForm({setAuth, position, setPosition, initCoord}) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetInvalid = (id) => {
        let invalidText = document.getElementById(id);
        invalidText.style.display = 'none';
        let inputBox = invalidText.previousElementSibling;
        inputBox.style.border = 'none';
        let inputText = inputBox.previousElementSibling;
        inputText.style.color = 'inherit';
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetInvalid('invalid-username-text');
        resetInvalid('invalid-email-text');
        resetInvalid('invalid-password-text');
        let isValidUsername = username.length >= 4;
        let isValidEmail = emailPattern.test(email);
        let isValidPassword = password.length >= 4;

        if (isValidUsername && isValidEmail && isValidPassword) {
            axios.post('/api/users/register', {
                "email":email,
                "username":username,
                "hashPassword":password,
                "latitude":position.lat,
                "longitude":position.lng
            }).then(response => {
                setAuth({username:username, isLoggedIn:true});
                navigate('/');    
            })
            .catch(error => {
                let existingText = document.getElementById('existing-username-text');
                existingText.style.display = 'block';
                let inputBox = existingText.previousElementSibling.previousElementSibling;
                inputBox.style.border = '1px solid red';
                let inputText = inputBox.previousElementSibling;
                inputText.style.color = 'red';    
            });
        } else {
            if (!isValidUsername) {
                let invalidText = document.getElementById('invalid-username-text');
                invalidText.style.display = 'block';
                let inputBox = invalidText.previousElementSibling;
                inputBox.style.border = '1px solid red';
                let inputText = inputBox.previousElementSibling;
                inputText.style.color = 'red';    
            }
            if (!isValidEmail) {
                let invalidText = document.getElementById('invalid-email-text');
                invalidText.style.display = 'block';
                let inputBox = invalidText.previousElementSibling;
                inputBox.style.border = '1px solid red';
                let inputText = inputBox.previousElementSibling;
                inputText.style.color = 'red';    
            }
            if (!isValidPassword) {
                let invalidText = document.getElementById('invalid-password-text');
                invalidText.style.display = 'block';
                let inputBox = invalidText.previousElementSibling;
                inputBox.style.border = '1px solid red';
                let inputText = inputBox.previousElementSibling;
                inputText.style.color = 'red';    
            }
        }
    }

    return (
        <>
        <form action="post" onSubmit={handleSubmit} className="login-form">
            <h2>Sign up</h2>

            <label htmlFor="username">Username</label>
            <input type="text" name="username"
                onChange={(e) => setUsername(e.target.value)}/>

            <h5 id="invalid-username-text">Username should be between 6 and 16 characters long and contain only alphanumeric characters.</h5>
            <h5 id="existing-username-text">Username already exists.</h5>

            <label htmlFor="email">E-mail</label>
            <input type="text" name="email"
                onChange={(e) => setEmail(e.target.value)}/>

            <h5 id="invalid-email-text">Invalid email.</h5>

            <label htmlFor="password">Password</label>
            <input type="password" name="password"
                onChange={(e) => setPassword(e.target.value)}/>

            <h5 id="invalid-password-text">Invalid password.</h5>

            <label htmlFor="location">Location</label>
            <Map position={position} setPosition={setPosition} initCoord={initCoord} />
            <label htmlFor="lat">Latitude: {position.lat}</label>
            <label htmlFor="lng">Longitude: {position.lng}</label>

            <input type="submit" value="Sign up" className="login-button"/>
        </form>
        </>
    )
}

export default SignupForm