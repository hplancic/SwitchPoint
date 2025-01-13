import '../styles/MypageContent.css'

export default function WishCard(props) {
    return (
        <>
            <div className="wishcard">
                <div>
                <div className="wishcard-row">
                        <label>Artist</label>
                        <label>{props.artist}</label>
                    </div>
                    <div className="wishcard-row">
                        <label>Album</label>
                        <label>{props.album}</label>
                    </div>
                    <div className="wishcard-row">
                        <label>Genre</label>                    
                        <label>{props.genre}</label>
                    </div>
                    <div className="wishcard-row">
                        <label>Year</label>
                        <label>{props.year}</label>
                    </div>
                </div>
            </div>
        </>
    )
}