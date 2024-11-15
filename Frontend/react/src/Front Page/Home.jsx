import Header from '../Headers/Header.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import CardList from './Content/CardList.jsx'
import SearchBar from './Content/SearchBar.jsx'


function Home({title}) {
    
    return (
        <>
        <Header title={title} />
        <div className='content'>
            <Sidebar />
            <SearchBar />
            <CardList />
        </div>
        </>
    )
}

export default Home