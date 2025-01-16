import { useState } from "react";
import "../styles/MypageContent.css";
import GenreSelect from "./GenreSelect";
import axios from "axios";

export default function NewWishCard() {

    const [artist, setArtist] = useState(null);
    const [album, setAlbum] = useState(null);
    const [genre, setGenre] = useState(null);
    const [year, setYear] = useState(null);

    const closePopUp = (e) => {
        if (e.target.id == 'overlay' || e.target.id == "send-exchange-button" || e.target.id == "closeButton") {
            let overlay = document.getElementById('overlay');
            overlay.style.display = 'none';        
        }
    };

    const addToWishlist = (e) => {
        console.log(artist, album, genre, year);
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                axios.post('/api/vinyls', {
                    vinylTitle:album,
                    artist:artist,
                    genre:genre,
                    releaseYear:year
                }).then(response => {
                    let vinylId = response.data.vinylId;
                    //console.log(userId, vinylId);
                    const formData = new FormData();
                    formData.append("vinylId", vinylId);
                    axios.post('/api/users/' + userId + '/wishlist', formData)
                    .then(response => {
                        window.location.reload();
                        //console.log(response);
                    }).catch(error => {
                        console.log(error);
                    })
                }).catch(error => {
                    console.log("error", error);
                });
            }).catch(error => {
                console.log(error);
            })
        
    };

    return (
        <>
            <div id="overlay" onClick={(e) => {closePopUp(e)}}>
                <div id="card-exchange-view">
                    <div className="titleGroup">
                        <h2 className="title">Dodaj u Popis Želja</h2>
                        <input type="image" src="/closeBtn.svg" id="closeButton" onClick={(e) => {closePopUp(e)}}></input>
                    </div>
                    <div className="addVinylForm">
                        <div className="inputGroup">
                            <label>Umjetnik:</label>
                            <input type="text" onChange={(e) => setArtist(e.target.value)} />
                        </div>
                        <div className="inputGroup">
                            <label>Ime Albuma:</label>
                            <input type="text" onChange={(e) => setAlbum(e.target.value)} />
                        </div>
                        <div className="inputGroup wide">
                            <label>Žanr:</label>                    
                            <GenreSelect
                                setSelected={setGenre} />
                        </div>
                        <div className="inputGroup wide">
                            <label>Godina izdanja:</label>
                            <input type="number" onChange={(e) => setYear(e.target.value)} />
                        </div>
                        <button type="submit" className="wide" onClick={(e) => addToWishlist(e)}>Dodaj</button>
                    </div>
                </div>
            </div>
        </>
    )
}