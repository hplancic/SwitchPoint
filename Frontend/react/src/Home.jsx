import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import CardList from './CardList.jsx'
import SearchBar from './SearchBar.jsx'


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