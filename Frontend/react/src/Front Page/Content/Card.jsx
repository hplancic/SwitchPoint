import { Link } from 'react-router-dom'
import '../../styles/Card.css'
import axios from 'axios';
import ChooseExchangeVinyl from '../ChooseExchangeVinyls';
import { useEffect, useState } from 'react';

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

const conditionReducedName = {
    'MINT': "M",
    'NEAR_MINT': "NM",
    'VERY_GOOD_PLUS': "VG+",
    'VERY_GOOD': "VG",
    'GOOD_PLUS': "G+",
    'GOOD': "G",
    'FAIR':"F",
    'POOR':"P"
};

function Card(props) {

    //if (props.type=="EXCHANGE_CARD") console.log("2");
    const [expanded, setExpanded] = useState(false);

    const showMore = (e) => {
        let clicked = e.classList.contains("value-clicked");
        if (!clicked) e.classList.add("value-clicked");
        else e.classList.remove("value-clicked");
    };

    const expandCard = (e) => {
        let selectedCard = e.target.closest(".card");
        let artist = selectedCard.querySelector(".artist-title");
        let album = selectedCard.querySelector(".album-title");
        showMore(artist);
        showMore(album);
        if (expanded) setExpanded(false);
        else setExpanded(true);
    }

    const deleteVinyl = () => {
        console.log(props.data, props.data.user.userId, props.data.vinyl.vinylId);
        axios.delete('/api/users/' + props.data.user.userId + '/vinyls/' + props.data.vinyl.vinylId)
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                console.log("Delete vinyl ERROR:", err);
            });
    };

    const changeVinyl = () => {
        axios.get('/api/users/username?username=' + JSON.parse(localStorage.getItem('auth')).username)
            .then((res) => {
                let userId = res.data.userId;
                props.setSenderId(userId);
                props.setReceiverId(props.data.user.userId);
                //console.log(props.data.id, props.type);
                props.setReceiverUserVinylIds(new Set([props.data.id]))
                axios.get('/api/users/' + userId + '/vinyls')
                .then((res) => {
                    //console.log("TEST 1", res.data);
                    props.setMyVinyls(res.data);
                })
                .catch((err) => {
                    console.log("Change vinyl ERROR:", err);
                });
            })
            .catch((err) => {
                console.log("Get username ERROR:", err);
            });

    }

    const selectVinyl = (e) => {
        let selectedCard = e.target.closest(".card");
        if (selectedCard.classList.contains("card-select")) {
            selectedCard.classList.remove("card-select");
            let temp = props.selectedVinyls;
            temp.delete(props.data.id);
            props.setSelectedVinyls(temp);
        } else {
            selectedCard.classList.add("card-select");
            let temp = props.selectedVinyls;
            temp.add(props.data.id)
            props.setSelectedVinyls(temp);
        }
    };

    useEffect(() => {
        //console.log("TEST 4", props.myVinyls);
        if (props.myVinyls != null) {
            //console.log("TEST 2", props.myVinyls);
            let overlay = document.getElementById('overlay');
            overlay.style.display = 'grid';
        }
    }, [props.myVinyls]);

    const haversineDistanceKM = (lat1Deg, lon1Deg, lat2Deg, lon2Deg) => {
        //console.log(lat1Deg, lon1Deg, lat2Deg, lon2Deg);
        function toRad(degree) {
            return degree * Math.PI / 180;
        }
        
        const lat1 = toRad(lat1Deg);
        const lon1 = toRad(lon1Deg);
        const lat2 = toRad(lat2Deg);
        const lon2 = toRad(lon2Deg);
        
        const { sin, cos, sqrt, atan2 } = Math;
        
        const R = 6371; // earth radius in km 
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1;
        const a = sin(dLat / 2) * sin(dLat / 2)
                + cos(lat1) * cos(lat2)
                * sin(dLon / 2) * sin(dLon / 2);
        const c = 2 * atan2(sqrt(a), sqrt(1 - a)); 
        const d = R * c;
        //console.log(d);
        return d; // distance in km
    }
    const [flag, setFlag] = useState(props.userData!=null);
    useEffect(() => {
        if (props.userData) setFlag(true);
    }, [props.userData]);
    
    return (
        <div className="card" onClick={props.type=="EXCHANGE_CARD" ? (e) => {selectVinyl(e)} : (e) => {expandCard(e)}} style={props.hide ? {display:"none"} : null}>
            <div className='img-wrapper'>
                <img className="albumImage" src= { props.data.image ? 'data:image/png;base64,' + props.data.image.imageData : '../../public/unavailable-image.jpg'} />
            </div>
            <div className="KVPair">
                <div className="value album-title"> {props.data.vinyl.vinylTitle} </div>
            </div>
            <div className="KVPair">
                <div className="value artist-title"> {props.data.vinyl.artist}</div>
            </div>
            <div className="KVPair">
                <div className="key">Žanr: </div>
                <div className="value bubble"> {props.data.vinyl.genre} </div>
            </div>

            <div className="KVPair">
                <div className="key">Godina: </div>
                <div className="value bubble"> {props.data.vinyl.releaseYear} </div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Ploče: </div>
                <div className={"value bubble colored " + conditionToColor[props.data.vinylCondition]}> {conditionReducedName[props.data.vinylCondition]} </div>
            </div>
            <div className="KVPair">
                <div className="key">Stanje Omota: </div>
                <div className={"value bubble colored " + conditionToColor[props.data.sleeveCondition]}> {conditionReducedName[props.data.sleeveCondition]} </div>
            </div>
            {expanded && <hr></hr>}
            {expanded && <div className="KVPair">
                <div className="key">Oznaka izdanja</div>
                <div className={"value"}> {props.data.oznIzdanja ? props.data.oznIzdanja : "-"} </div>
            </div>}
            {expanded && <div className="KVPair">
                <div className="key">Opis</div>
                <div className={"value"}> {props.data.opis ? props.data.opis : "-"} </div>
            </div>}
            {expanded && <div className="KVPair">
                <div className="key">Korisnik</div>
                <div className="value bubble"> {props.data.user.username} </div>
            </div>}

            {props.auth?.isLoggedIn && flag && expanded &&
                <div className="KVPair">
                    <div className="key bubble">Udaljenost</div>
                    <div className="value">{Math.round(haversineDistanceKM(props.userData.latitude, props.userData.longitude, props.data.user.latitude, props.data.user.longitude) * 100) / 100} km</div>
                </div>
            }

            {(props.type=="USER_CARD" || props.auth?.username=="admin") && <button className='delete-vinyl-button' onClick={deleteVinyl}>Izbriši Ploču</button>}
            {props.type=="CHANGE_CARD" && <button className='change-vinyl-button' onClick={changeVinyl}>Ponudi zamjenu</button>}
            {props.exchangeType=="EDIT" ? null : <ChooseExchangeVinyl vinyls={props.myVinyls ? props.myVinyls : new Array()} 
                transactionData={{
                    "senderId":props.senderId,
                    "receiverId":props.receiverId,
                    "receiverUserVinylIds":props.receiverUserVinylIds
                }}
                type={props.exchangeType ? props.exchangeType : ""}
            />}
        </div>
    )
}

export default Card