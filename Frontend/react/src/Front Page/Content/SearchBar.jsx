import '../../styles/SearchBar.css'

function SearchBar(props) {

    const handleSearch = (e) => {
        e.preventDefault();
    }

    const searchChange = (e) => {
        //console.log(e.target.value);
        props.setSearch(e.target.value);
    };

    return (
        <form action="post" className="searchForm" onSubmit={handleSearch}>
            <input type="text" name="search" id="searchInput" placeholder="Search artist or album name" onChange={(e) => searchChange(e)}/>
        </form>
    )
}

export default SearchBar