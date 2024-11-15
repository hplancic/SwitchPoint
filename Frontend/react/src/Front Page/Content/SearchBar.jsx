import '../../styles/SearchBar.css'

function SearchBar() {

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <form action="post" className="searchForm" onSubmit={handleSearch}>
            <input type="text" name="search" id="searchInput" placeholder="Search artist or album name"/>
            <img src="../../../searchIcon.svg" alt="searchIcon" id='searchIcon' />
        </form>
    )
}

export default SearchBar