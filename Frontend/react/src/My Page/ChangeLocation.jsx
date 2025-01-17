import {MapContainer, TileLayer, useMapEvents, Marker, Popup, useMap} from 'react-leaflet';

export default function ChangeLocation(props) {
    return (
        <div>
            <h3>Lokacija ({props.location.latitude}, {props.location.longitude})</h3>
            <MapContainer center={[props.location.latitude, props.location.longitude]} zoom={13} scrollWheelZoom={false}>
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[props.location.latitude, props.location.longitude]} />
            </MapContainer>
        </div>
    )
}