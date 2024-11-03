import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import CardList from './CardList.jsx'


function Home() {
    return (
        <>
        <Header />
        <div className='content'>
            <Sidebar />
            <CardList />
        </div>
        </>
    )
}

export default Home