import LoggedInHeader from "./LoggedInHeader";

function MyPage({auth, setAuth}) {
    return (
        <>
        <LoggedInHeader auth={auth} setAuth={setAuth}/>
        </>
    )
}

export default MyPage;