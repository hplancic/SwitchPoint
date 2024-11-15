import Header from "../Headers/Header.jsx";
import SignupForm from "./SignupForm.jsx";
import { useEffect } from "react";
import { initializeGoogleSignIn } from "../assets/utils/googleAuth";



function Signup({setAuth, title}) {

    useEffect(() => {
        initializeGoogleSignIn();
    }, []);

    return (
        <>
            <Header title={title} />
            <div className="login-form">
                <SignupForm setAuth={setAuth} />
                <div id="google-login"></div>
            </div>
        </>
    );
}

export default Signup;
