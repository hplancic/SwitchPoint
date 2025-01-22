import { Link } from "react-router-dom"
import '../styles/Header.css'
import { useContext, useState } from "react";
import { ThemeContext } from "../App";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function Header({title}){

    const theme = useContext(ThemeContext);

    const [isDarkMode, setDarkMode] = useState(theme=="dark");
    
    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
        localStorage.setItem("theme", checked ? "dark" : "light");
        window.location.reload();
    };

    return (
        <div className="header">
            <Link to="/" className="header-title">{title}</Link>
            <div className="header-buttons"> 
                <Link to="/signup" className="header-button">Sign up</Link>
                <Link to="/login" className="header-button">Log in</Link>
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

export default Header