import './SearchBar.css'

function SearchBar() {

    const handleSearch = (e) => {
        e.preventDefault();
    }

    return (
        <form action="post" className="searchForm" onSubmit={handleSearch}>
            <input type="text" name="search" id="searchInput" placeholder="Search artist or album name"/>
            <input type="submit" value="Search" id="searchButton"/>
        </form>
    )
}

export default SearchBar