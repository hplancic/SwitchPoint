import WishCard from "./WishCard";
import "../styles/MypageContent.css";
import NewWishCard from "./NewWishCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../App";

function PopisZelja(props) {

    const [wishlist, setWishlist] = useState(null);
    const [flag, setFlag] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loadedFlag, setLoadedFlag] = useState(false);
    const theme = useContext(ThemeContext);

    const openAddWishCard = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'grid';
    };

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                setUserId(userId)
                axios.get('/api/users/' + userId + '/wishlist')
                    .then(response => {
                        setWishlist(response.data);
                        setLoadedFlag(true);
                    })
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
                <h2 className={"title " + theme}>Popis želja</h2>      
                <button className="mypage-top-content-button" onClick={() => openAddWishCard()}>Dodaj Ploču</button>          
            </div>
            <NewWishCard />
            <hr />
            <div id="wishcards">
                {!loadedFlag && <h2 className={theme}>Učitavanje popisa želja...</h2>}
                {flag && wishlist.length==0 && <h2 style={{marginLeft:"10px"}} className={theme}>Nema želja.</h2>}
                {flag && wishlist.map((wishcard, index) => (
                    <WishCard
                        key={index}
                        artist={wishcard.vinyl.artist}
                        album={wishcard.vinyl.vinylTitle}
                        genre={wishcard.vinyl.genre}
                        year={wishcard.vinyl.releaseYear}
                        wishlistId={wishcard.id}
                        userId={userId}/>
                ))}
            </div>
        </>
    )
}

export default PopisZelja;