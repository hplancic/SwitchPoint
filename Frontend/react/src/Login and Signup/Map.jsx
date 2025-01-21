import {MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap} from 'react-leaflet';
import '../styles/Map.css';
import { useState } from 'react';

export default function Map({position, setPosition, initCoord}) {

    function LocationMarker() {
        //const [position, setPosition] = useState(null);
        const map = useMapEvents({
          click: (e) => {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            //console.log(position);
          },
        });
        return position === null ? null : (
            <Marker position={position}>
              <Popup>You clicked here</Popup>
            </Marker>
          );
    }

    return (
        <MapContainer center={initCoord} zoom={13} scrollWheelZoom={false} id='signup-map'>
            <TileLayer 
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    )
}