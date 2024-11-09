import Header from "./Header";
import SignupForm from "./SignupForm";
import { useEffect } from "react";
import { initializeGoogleSignIn } from "./assets/utils/googleAuth";



function Signup({setAuth}) {

    useEffect(() => {
        initializeGoogleSignIn();
    }, []);

    return (
        <>
            <Header />
            <div className="login-form">
                <SignupForm setAuth={setAuth} />
                <div id="google-login"></div>
            </div>
        </>
    );
}

export default Signup;
