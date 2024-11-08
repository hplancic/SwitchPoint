import { Link } from 'react-router-dom'
import './Card.css'

function Card() {
    return (
        <div className="card">
            <img className="albumImage" src="/Prokletije2Front.jpg" />
            <div className="KVPair">
                <div className="key">Izvođač</div>
                <div className="value">Nemeček</div>
            </div>
            <div className="KVPair">
                <div className="key">Album</div>
                <div className="value">Prokletije II</div>
            </div>
            <div className="KVPair">
                <div className="key">Žanr</div>
                <div className="value bubble">Rock</div>
            </div>

            <hr></hr>

            <div className="KVPair">
                <div className="key">Oznaka izdanja</div>
                <div className="value">V-8538</div>
            </div>
            <div className="KVPair">
                <div className="key">Godina Izdanja</div>
                <div className="value bubble">2024</div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Ploče</div>
                <div className="value bubble">VG+</div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Omota</div>
                <div className="value bubble">NM</div>
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