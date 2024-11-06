
function LoggedInHeader() {
    return (
        <div className="header">
            <Link to="/" className="header-title">SwitchPoint</Link>
            <div className="header-buttons"> 
                <Link to="/" className="username-butotn">Log in</Link>
            </div>
        </div>
    )

}

export default LoggedInHeader