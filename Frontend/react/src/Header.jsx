import { Link } from "react-router-dom"
import './styles/Header.css'

function Header(){
    return (
        <div className="header">
            <Link to="/" className="header-title">SwitchPoint</Link>
            <div className="header-buttons"> 
                <Link to="/signup" className="header-button">Sign up</Link>
                <Link to="/login" className="header-button">Log in</Link>
            </div>
        </div>
    )
}

export default Header