import Header from '../Headers/Header.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import CardList from './Content/CardList.jsx'
import SearchBar from './Content/SearchBar.jsx'
import AllVinyls from './AllVinyls.jsx'

function Home({title}) {
    
    return (
        <>
        <Header title={title} />
        <div className='content'>
            <Sidebar />
            <SearchBar />
            <AllVinyls />
        </div>
        </>
    )
}

export default Home