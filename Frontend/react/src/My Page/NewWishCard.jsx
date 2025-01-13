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
        if (e.target.id == 'overlay' || e.target.id == "send-exchange-button") {
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
                    <h2>Add vinyl to Wishlist</h2>
                    <div className="add-wishlist-row">
                        <label>Artist</label>
                        <input type="text" onChange={(e) => setArtist(e.target.value)} />
                    </div>
                    <div className="add-wishlist-row">
                        <label>Album name</label>
                        <input type="text" onChange={(e) => setAlbum(e.target.value)} />
                    </div>
                    <div className="add-wishlist-genre">
                        <label>Select genre</label>                    
                        <GenreSelect
                            setSelected={setGenre} />
                    </div>
                    <div className="add-wishlist-row">
                        <label>Year of release</label>
                        <input type="number" onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <button style={{width:"100%", backgroundColor:"#313131", color:"white"}} onClick={(e) => addToWishlist(e)}>Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </>
    )
}