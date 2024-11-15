import Sidebar from './Sidebar/Sidebar.jsx'
import CardList from './Content/CardList.jsx'
import SearchBar from './Content/SearchBar.jsx'
import LoggedInHeader from '../Headers/LoggedInHeader.jsx'


function LoggedInHome(props) {

    return (
        <>
        <LoggedInHeader 
            title={props.title} 
            auth={props.auth} 
            setAuth={props.setAuth}/>
        <div className='content'>
            <Sidebar />
            <SearchBar />
            <CardList />
        </div>
        </>
    )
}

export default LoggedInHome