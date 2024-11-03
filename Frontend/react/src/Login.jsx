import Header from './Header'
import LoginForm from './LoginForm'
import { useEffect } from 'react'

function Login() {

    const google = window.google;

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
    };

    useEffect(() => {
        google.accounts.id.initialize({
            client_id:"",
            callback: handleCallbackResponse,
        });

        google.accounts.id.renderButton(document.getElementById('google-login'), {
            theme: 'outline',
            size: 'large',
        });
    }, []);

    return (
        <>
        <Header/>
        <div className='login-form'>
            <LoginForm />
            <div id='google-login'></div>
        </div>
        </>
    )
}

export default Login