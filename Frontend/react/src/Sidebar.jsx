
function Sidebar() {
    return (
        <div className="sidebar">
            <div>Filter</div>
            <hr></hr>
            <form>
                <input type="text" placeholder="artist name" id="artistname" name="artistname"></input>
                <input type="text" placeholder="album name" id="albumname" name="albumname"></input>
                <input type="range"></input>
                <fieldset>
                    <legend>Vinyl State</legend>

                    <label for="new">New</label>
                    <input type="checkbox" id="new" name="new" value="new"></input>
                    <label for="used">Used</label>
                    <input type="checkbox" id="used" name="used" value="used"></input>
                </fieldset>
            </form>
            <div>Godina</div>
            <div>1920 - 2024</div>
        </div>
    )
}

export default Sidebar