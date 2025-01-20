import '../styles/MypageContent.css'
import '../styles/Card.css'
import axios from "axios";


export default function WishCard(props) {

    const deleteWishCard = () => {
        axios.delete('/api/users/' + props.userId + '/wishlist/' + props.wishlistId)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log("Delete WishCard ERROR:", err);
            });
    };


    return (
        <>
            <div className="card">
                <div className="KVPair">
                    <div className="key">Artist</div>
                    <div className="value">{props.artist}</div>
                </div>
                <div className="KVPair">
                    <div className="key">Album</div>
                    <div className="value">{props.album}</div>
                </div>
                <div className="KVPair">
                    <div className="key">Genre</div>
                    <div className="value bubble">{props.genre}</div>
                </div>
                <div className="KVPair">
                    <div className="key">Year</div>
                    <div className="value">{props.year}</div>
                </div>

                <button className='delete-vinyl-button' onClick={deleteWishCard}>Izbriši Ploču</button>
            </div>
        </>
    )
}