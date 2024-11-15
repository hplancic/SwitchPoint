import { Link } from 'react-router-dom'
import '../../styles/Card.css'

const conditionToColor = {
    'MINT': "darkblue",
    'NEAR_MINT': "blue",
    'VERY_GOOD_PLUS': "darkgreen",
    'VERY_GOOD': "green",
    'GOOD_PLUS': "yellow",
    'GOOD': "orange",
    'FAIR':"pink",
    'POOR':"red"
};

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
                <div className={"value bubble colored " + conditionToColor[props.vinyl.vinylCondition]}> {props.vinyl.vinylCondition} </div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Omota</div>
                <div className={"value bubble colored " + conditionToColor[props.vinyl.sleeveCondition]}> {props.vinyl.sleeveCondition} </div>
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