import '../styles/MypageContent.css'
import '../styles/Card.css'


export default function WishCard(props) {
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
            </div>
        </>
    )
}