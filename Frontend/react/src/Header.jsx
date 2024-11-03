import { Link } from "react-router-dom"

function Header(){
    return (
        <div className="header">
            <Link to="/" className="header-title">SwitchPoint</Link>
            <div className="header-buttons">
                <Link to="/login" className="header-button">Log in</Link>
                <Link to="/signup" className="header-button">Sign up</Link>
            </div>
        </div>
    )
}

export default Header