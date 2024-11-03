
function LoginForm() {
    return (
        <>
        <form action="post">
        <label htmlFor="username">Username</label>
        <input type="text" name="username"/>
        <label htmlFor="password">Password</label>
        <input type="text" name="password"/>
        <input type="submit" value="Log in" />
        </form>
        </>
    )
}

export default LoginForm