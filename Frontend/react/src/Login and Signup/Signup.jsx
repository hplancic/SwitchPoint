import Header from "../Headers/Header.jsx";
import SignupForm from "./SignupForm.jsx";
import { useEffect, useState } from "react";
import { initializeGoogleSignIn } from "../assets/utils/googleAuth";
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import LoggedInHeader from "../Headers/LoggedInHeader.jsx";

const initCoord = [45.8150, 15.9819];

function Signup({auth, setAuth, title}) {

    const navigate = useNavigate();
    const [position, setPosition] = useState({"lat":initCoord[0], "lng":initCoord[1]});

    useEffect(() => {
        initializeGoogleSignIn();
    }, []);

    return (
        <>
            <LoggedInHeader title={title} auth={auth}/>
            <div className="login-form">
                <SignupForm setAuth={setAuth} position={position} setPosition={setPosition} initCoord={initCoord} />
                <GoogleOAuthProvider clientId="817895363129-joisrep5bkd9fcomrekms9hbagm3u05d.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        axios.post('/api/auth/google', {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: { 
                                token: credentialResponse.credential,
                                latitude: position.lat,
                                longitude: position.lng
                            },
                        })
                        .then(response => {
                            console.log("CHECK", response);
                            const decoded = jwtDecode(credentialResponse.credential);
                            console.log("test", decoded);
                            let username = decoded.name;
                            setAuth({username:username, isLoggedIn:true});
                            navigate('/');
                        })
                        .catch(error => {
                            console.log("ERROR",error);
                        })
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    />
                </GoogleOAuthProvider>
            </div>
        </>
    );
}

export default Signup;
