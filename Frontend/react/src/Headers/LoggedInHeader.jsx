import { Link, replace, useNavigate } from "react-router-dom"
import '../styles/Header.css'

function LoggedInHeader(props){

    const navigate = useNavigate();

    const logout = () => {
        props.setAuth({"username":"username", "isLoggedIn":false});
        localStorage.setItem('auth', '{"username":"username", "isLoggedIn":false}');
        navigate("/");
        window.location.reload();
    }

    console.log(props.numberOfOffers);

    return (
        <div className="header">
            <Link to="/" className="header-title">{props.title}</Link>
            <div className="header-buttons"> 
                <Link onClick={() => logout()} to="/" className="header-button logout-button">Log out</Link>
                <Link to="/mypage" className="header-button">{props.auth.username} {props.numberOfOffers>0 ? <span>({props.numberOfOffers})</span> : null} </Link>
            </div>
        </div>
    )
}

export default LoggedInHeader