import { useState } from "react";

function NewVinyl() {

    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [vinylCondition, setVinylCondition] = useState("");
    const [sleeveCondition, setSleeveCondition] = useState("");

    const closePopUp = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'none';    
    }

    const addVinyl = (e) => {
        e.preventDefault();
        closePopUp();
        console.log(artist, album, genre, year, vinylCondition, sleeveCondition);
    }

    return (
        <div id="overlay" onClick={closePopUp}>
            <div id="newvinyl-popup" onClick={ e => e.stopPropagation() }>
                <div className="titleGroup">
                    <h2 className="title">Add a new vinyl</h2>
                    <button id="closeButton" onClick={closePopUp}>X</button>
                </div>
                <form action="post" onSubmit={addVinyl}>

                    <label htmlFor="image">Choose image</label>
                    <input type="file" name="image" id="" />

                    <label htmlFor="artist">Artist name</label>
                    <input type="text" name="artist" id="" 
                        onChange={(e) => setArtist(e.target.value)}/>
                    
                    <label htmlFor="album">Album name</label>
                    <input type="text" name="album" id="" 
                        onChange={(e) => setAlbum(e.target.value)}/>

                    <label htmlFor="genre">Select genre</label>
                    <select name="genre" id="" 
                        onChange={(e) => setGenre(e.target.value)}>
                        <option value="Rock">Rock</option>
                        <option value="Pop">Pop</option>
                    </select>

                    <label htmlFor="year">Year of release</label>
                    <input type="number" name="year" id="" 
                        onChange={(e) => setYear(e.target.value)}/>

                    <label htmlFor="vinyl-condition">Select vinyl condition</label>
                    <select name="vinyl-condition" id="" 
                        onChange={(e) => setVinylCondition(e.target.value)}>
                        <option value="VG">VG</option>
                        <option value="M">M</option>
                    </select>

                    <label htmlFor="sleeve-condition">Select sleeve condition</label>
                    <select name="sleeve-condition" id=""
                        onChange={(e) => setSleeveCondition(e.target.value)}>
                        <option value="VG">VG</option>
                        <option value="M">M</option>
                    </select>

                    <input type="submit" value="Add vinyl" />
                </form>
            </div>
        </div>
    )
}

export default NewVinyl;