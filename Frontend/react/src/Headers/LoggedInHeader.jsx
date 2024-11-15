import { Link, replace, useNavigate } from "react-router-dom"
import '../styles/Header.css'

function LoggedInHeader({title, auth, setAuth}){

    const navigate = useNavigate();

    const logout = () => {
        setAuth({"username":"username", "isLoggedIn":false});
        localStorage.setItem('auth', '{"username":"username", "isLoggedIn":false}');
    }

    return (
        <div className="header">
            <Link to="/" className="header-title">{title}</Link>
            <div className="header-buttons"> 
                <Link onClick={() => logout()} to="/" className="header-button logout-button">Log out</Link>
                <Link to="/mypage" className="header-button">{auth.username}</Link>
            </div>
        </div>
    )
}

export default LoggedInHeader