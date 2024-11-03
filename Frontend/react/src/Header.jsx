
function Header(){
    return (
        <div className="header">
            <a href="/" className="header-title">SwitchPoint</a>
            <div className="header-buttons">
                <button><a href="/login">Log in</a></button>
                <button><a href="/signup">Sign up</a></button>
            </div>
        </div>
    )
}

export default Header