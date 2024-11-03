
function LoginForm() {
    return (
        <>
        <form action="post">
            <h2>Log in</h2>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password"/>
            <input type="submit" value="Log in" className="submit-button"/>
        </form>
        </>
    )
}

export default LoginForm