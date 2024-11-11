import { Link } from 'react-router-dom'
import './styles/Card.css'

function Card(props) {
    return (
        <div className="card">
            <img className="albumImage" src= { props.vinyl.vinylImage} />
            <div className="KVPair">
                <div className="key">Izvođač</div>
                <div className="value"> {props.vinyl.artist}</div>
            </div>
            <div className="KVPair">
                <div className="key">Album</div>
                <div className="value"> {props.vinyl.vinylTitle} </div>
            </div>
            <div className="KVPair">
                <div className="key">Žanr</div>
                <div className="value bubble"> {props.vinyl.genre} </div>
            </div>

            <hr></hr>

            <div className="KVPair">
                <div className="key">Godina Izdanja</div>
                <div className="value bubble"> {props.vinyl.releaseYear} </div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Ploče</div>
                <div className="value bubble"> {props.vinyl.vinylCondition} </div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Omota</div>
                <div className="value bubble"> {props.vinyl.sleeveCondition} </div>
            </div>

            <hr></hr>

            <div className="KVPair">
                <div className="key bubble">Lokacija</div>
                <div className="value">5 km daleko</div>
            </div>

        </div>
    )
}

export default Card