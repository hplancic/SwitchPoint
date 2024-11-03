
function SignupForm() {
    return (
        <>
        <form action="post">
        <label htmlFor="username">Username</label>
        <input type="text" name="username"/>
        <label htmlFor="email">E-mail</label>
        <input type="text" name="email"/>
        <label htmlFor="password">Password</label>
        <input type="text" name="password"/>
        <input type="submit" value="Sign up" />
        </form>
        </>
    )
}

export default SignupForm