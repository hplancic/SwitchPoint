import Sidebar from './Sidebar.jsx'
import CardList from './CardList.jsx'
import LoggedInHeader from './LoggedInHeader.jsx'


function LoggedInHome({auth, setAuth}) {
    return (
        <>
        <LoggedInHeader auth={auth} setAuth={setAuth}/>
        <div className='content'>
            <Sidebar />
            <CardList />
        </div>
        </>
    )
}

export default LoggedInHome