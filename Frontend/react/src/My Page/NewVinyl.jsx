import { useState } from "react";
import axios from "axios";
import ConditionSelect from "./ConditionSelect";
import GenreSelect from "./GenreSelect";

function NewVinyl() {

    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [vinylCondition, setVinylCondition] = useState("");
    const [sleeveCondition, setSleeveCondition] = useState("");
    const [file, setFile] = useState(null);
    const [edition, setEdition] = useState("");
    const [description, setDescription] = useState("");

    const closePopUp = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'none';    
    }

    const addVinyl = (e) => {
        e.preventDefault();
        let username = JSON.parse(localStorage.getItem('auth')).username;
        closePopUp();
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                //console.log(artistAlbums, vinylIds);
                const formData = new FormData();
                formData.append("vinylTitle", album);
                formData.append("artist", artist);
                formData.append("genre", genre);
                formData.append("releaseYear", year);
                formData.append("vinylCondition", vinylCondition);
                formData.append("sleeveCondition", sleeveCondition);
                formData.append("imageFile", file);
                formData.append("edition", edition);
                formData.append("description", description)
/*                 let postPATH = '?vinylTitle='+album
                        +'&artist='+artist
                        +'&genre='+genre
                        +'&releaseYear='+year
                        +'&vinylCondition='+vinylCondition
                        +'&sleeveCondition='+sleeveCondition
                        +'&imageFile='+file; */
                axios.post('/api/users/' + userId + '/vinyls', formData, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                }) // + postPATH)
                    .then(response => {
                        console.log("Successfully added a new vinyl.");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div id="overlay" onClick={closePopUp}>
            <div id="card-exchange-view" onClick={ e => e.stopPropagation() }>
                <div className="titleGroup">
                    <h2 className="title">Dodaj Novu Ploču</h2>
                    <input type="image" src="/closeBtn.svg" id="closeButton" onClick={closePopUp}></input>
                </div>
                <form action="post" onSubmit={addVinyl} class="addVinylForm">

                    <div className="inputGroup">
                        <label htmlFor="artist">Izvođač:</label>
                        <input type="text" name="artist" id="" required
                            onChange={(e) => setArtist(e.target.value)}/>
                    </div>
                    
                    <div className="inputGroup">
                        <label htmlFor="album">Ime Albuma:</label>
                        <input type="text" name="album" id="" required
                            onChange={(e) => setAlbum(e.target.value)}/>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="year">Godina Izdanja:</label>
                        <input type="number" name="year" id="" required min="1920" max={new Date().getFullYear()} step="1"
                            onChange={(e) => setYear(e.target.value)}/>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="edition">Izdanje</label>
                        <input type="text" name="edition" id="" 
                            onChange={(e) => setEdition(e.target.value)}/>
                    </div>

                    <div className="inputGroup wide">
                        <label>Žanr:</label>                    
                        <GenreSelect
                            setSelected={setGenre} />
                    </div>

                    <div className="inputGroup">
                        <label>Stanje Vinila:</label>                    
                        <ConditionSelect
                            setSelected={setVinylCondition} />
                    </div>
                    <div className="inputGroup">
                        <label>Stanje Omota:</label>
                        <ConditionSelect
                            setSelected={setSleeveCondition} />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="description">Opis:</label>
                        <input type="text" name="description" id="" maxLength="30"
                            onChange={(e) => setDescription(e.target.value)}/>
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="image">Izaberi Sliku:</label>
                        <input type="file" name="image" id="inputImage" required
                            onChange={(e) => setFile(e.target.files[0])} />
                    </div>

                    <input type="submit" value="Dodaj" className="wide"/>
                </form>
            </div>
        </div>
    )
}

export default NewVinyl;