import Header from "./Header";
import SignupForm from "./SignupForm";
import { useEffect } from "react";
import { initializeGoogleSignIn } from "./assets/utils/googleAuth";



function Signup() {

    useEffect(() => {
        initializeGoogleSignIn();
    }, []);

    return (
        <>
            <Header />
            <div className="login-form">
                <SignupForm />
                <div id="google-login"></div>
            </div>
        </>
    );
}

export default Signup;
