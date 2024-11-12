import Sidebar from './Sidebar/Sidebar.jsx'
import CardList from './Content/CardList.jsx'
import LoggedInHeader from '../Headers/LoggedInHeader.jsx'


function LoggedInHome({title, auth, setAuth}) {
    return (
        <>
        <LoggedInHeader title={title} auth={auth} setAuth={setAuth}/>
        <div className='content'>
            <Sidebar />
            <CardList />
        </div>
        </>
    )
}

export default LoggedInHome