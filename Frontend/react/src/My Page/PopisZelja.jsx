import WishCard from "./WishCard";
import "../styles/MypageContent.css";
import NewWishCard from "./NewWishCard";
import { useEffect, useState } from "react";
import axios from "axios";

function PopisZelja() {

    const [wishlist, setWishlist] = useState(null);
    const [flag, setFlag] = useState(false);

    const openAddWishCard = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'grid';
    };

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                axios.get('/api/users/' + userId + '/wishlist')
                    .then(response => setWishlist(response.data))
                    .catch(error => console.log(error));
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    useEffect(() => {
        if (wishlist) setFlag(true);
        console.log(wishlist);
    }, [wishlist]);

    return (
        <>
            <div className="mypage-top-content">
                <h2>Popis želja</h2>      
                <button className="mypage-top-content-button" onClick={() => openAddWishCard()}>Dodaj Ploču</button>          
            </div>
            <NewWishCard />
            <hr />
            <div id="wishcards">
                {flag && wishlist.map((wishcard, index) => (
                    <WishCard
                        key={index}
                        artist={wishcard.vinyl.artist}
                        album={wishcard.vinyl.vinylTitle}
                        genre={wishcard.vinyl.genre}
                        year={wishcard.vinyl.releaseYear}/>
                ))}
            </div>
        </>
    )
}

export default PopisZelja;