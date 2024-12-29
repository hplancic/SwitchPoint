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
            <div id="newvinyl-popup" onClick={ e => e.stopPropagation() }>
                <div className="titleGroup">
                    <h2 className="title">Add a new vinyl</h2>
                    <button id="closeButton" onClick={closePopUp}>X</button>
                </div>
                <form action="post" onSubmit={addVinyl}>

                    <label htmlFor="image">Choose image</label>
                    <input type="file" name="image" id="inputImage"
                        onChange={(e) => setFile(e.target.files[0])} />

                    <label htmlFor="artist">Artist name</label>
                    <input type="text" name="artist" id="" 
                        onChange={(e) => setArtist(e.target.value)}/>
                    
                    <label htmlFor="album">Album name</label>
                    <input type="text" name="album" id="" 
                        onChange={(e) => setAlbum(e.target.value)}/>

                    <div style={{maxWidth:'600px'}}>
                        <label>Select genre</label>                    
                        <GenreSelect
                            setSelected={setGenre} />
                    </div>

                    <label htmlFor="year">Year of release</label>
                    <input type="number" name="year" id="" 
                        onChange={(e) => setYear(e.target.value)}/>

                    <div style={{display:'flex'}}>
                        <div style={{maxWidth:'300px'}}>
                            <label>Select vinyl condition</label>                    
                            <ConditionSelect
                                setSelected={setVinylCondition} />
                        </div>
                        <div style={{maxWidth:'300px'}}>
                            <label>Select sleeve condition</label>
                            <ConditionSelect
                                setSelected={setSleeveCondition} />
                        </div>
                    </div>

                    <label htmlFor="edition">Edition</label>
                    <input type="text" name="edition" id="" 
                        onChange={(e) => setEdition(e.target.value)}/>

                    <label htmlFor="description">Description</label>
                    <input type="text" name="description" id="" 
                        onChange={(e) => setDescription(e.target.value)}/>

                    <input type="submit" value="Add vinyl" />
                </form>
            </div>
        </div>
    )
}

export default NewVinyl;