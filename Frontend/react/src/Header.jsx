
function Header(){
    return (
        <div className="header">
            <a href="/" className="header-title">SwitchPoint</a>
            <div className="header-buttons">
                <a href="/login" className="header-button">Log in</a>
                <a href="/signup" className="header-button">Sign up</a>
            </div>
        </div>
    )
}

export default Header