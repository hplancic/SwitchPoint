
function SignupForm() {
    return (
        <>
        <form action="post">
            <h2>Sign up</h2>
            <label htmlFor="username">Username</label>
            <input type="text" name="username"/>
            <label htmlFor="email">E-mail</label>
            <input type="text" name="email"/>
            <label htmlFor="password">Password</label>
            <input type="text" name="password"/>
            <input type="submit" value="Sign up" className="submit-button"/>
        </form>
        </>
    )
}

export default SignupForm