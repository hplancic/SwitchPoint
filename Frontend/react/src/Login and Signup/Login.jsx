import Header from '../Headers/Header.jsx'
import LoginForm from './LoginForm.jsx'
import { useEffect } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import LoggedInHeader from '../Headers/LoggedInHeader.jsx';

function Login({setAuth, title}) {

    const navigate = useNavigate();
    const google = window.google;

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
    };

    useEffect(() => {
        google?.accounts.id.initialize({
            client_id:"817895363129-joisrep5bkd9fcomrekms9hbagm3u05d.apps.googleusercontent.com",
            callback: handleCallbackResponse,
        });

        google?.accounts.id.renderButton(document.getElementById('google-login'), {
            theme: 'outline',
            size: 'large',
        });
    }, []);

    return (
        <>
        <Header title={title} />
        <div className='login-form'>
            <LoginForm setAuth={setAuth}/>
            <GoogleOAuthProvider clientId="817895363129-joisrep5bkd9fcomrekms9hbagm3u05d.apps.googleusercontent.com">
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                        axios.post('/api/auth/google', {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: { token: credentialResponse.credential },
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
                            navigate('/signup');
                        })
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    />
                </GoogleOAuthProvider>
        </div>
        </>
    )
}

export default Login