import {MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap} from 'react-leaflet';
import { useState } from 'react';
import Map from "../Login and Signup/Map.jsx";
import axios from "axios";

export default function ChangeLocation(props) {
    const initCoord = [props.location.latitude, props.location.longitude]
    const [position, setPosition] = useState({"lat":initCoord[0], "lng":initCoord[1]});

    const handleSubmit = (e) => {
        e.preventDefault();
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                console.log(userId)
                //console.log(artistAlbums, vinylIds);
                axios.put('/api/users/' + userId + '/location?lat=' + position.lat + "&lon=" + position.lng
                ) // + postPATH)
                    .then(response => {
                        console.log("Successfully changed location.");
                        window.location.reload();
                    })
                    .catch(error => {
                        console.log(error);
                    })
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
        <form action="post" onSubmit={handleSubmit} id="new-item-form">
            <h3>Promijeni Lokaciju:</h3>
            <Map position={position} setPosition={setPosition} initCoord={initCoord} />
            <h5>Zemljopisna Širina: {position.lat}</h5>
            <h5>Zemljopisna Dužina: {position.lng}</h5>

            <input type="submit" value="Promijeni" />
        </form>
        </>
    )
}