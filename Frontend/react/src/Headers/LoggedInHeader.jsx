import { Link, replace, useNavigate } from "react-router-dom"
import '../styles/Header.css'
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useState, useContext } from "react";
import { ThemeContext } from "../App";

function LoggedInHeader(props){

    const navigate = useNavigate();
    const theme = useContext(ThemeContext);

    const logout = () => {
        props.setAuth({"username":"username", "isLoggedIn":false});
        localStorage.setItem('auth', '{"username":"username", "isLoggedIn":false}');
        navigate("/");
        window.location.reload();
    }

    const [isDarkMode, setDarkMode] = useState(theme=="dark");

    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        localStorage.setItem("theme", checked ? "dark" : "light");
        window.location.reload();
    };

    //console.log(props.numberOfOffers);

    return (
        <div className="header">
            <Link to="/" className="header-title">{props.title}</Link>
            <div className="header-buttons"> 
                {props.auth.isLoggedIn ? 
                <>
                    <Link onClick={() => logout()} to="/" className="header-button logout-button">Log out</Link>
                    <Link to="/mypage" className="header-button">{props.auth.username} {props.numberOfOffers>0 ? <span>({props.numberOfOffers})</span> : null} </Link>
                </> : 
                <>
                    <Link to="/signup" className="header-button">Sign up</Link>
                    <Link to="/login" className="header-button">Log in</Link>
                </>}
                <DarkModeSwitch
                    style={{margin:"auto 10px", padding:"5px", borderRadius:"5px", cursor:"pointer"}}
                    className={theme}
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    size={30}
                    />
            </div>
        </div>
    )
}

export default LoggedInHeader