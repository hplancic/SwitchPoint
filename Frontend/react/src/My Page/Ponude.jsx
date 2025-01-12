import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Offers.css"
import Card from "../Front Page/Content/Card";
import Ponuda from "./Ponuda";

function Ponude() {

    const [offers, setOffers] = useState([]);
    const [sentOffers, setSentOffers] = useState([]);

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                axios.get('/api/transactions/received/' + userId)
                    .then(response => {
                        console.log("OFFERS:", response.data);
                        setOffers(response.data);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                axios.get('/api/transactions/sent/' + userId)
                    .then(response => {
                        setSentOffers(response.data)
                    })
                    .catch(error => {
                        console.log(error);
                    })
                
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <h3>Dobivene ponude (na čekanju)</h3>
            <div id="offer-view">
                {offers.filter((a) => {return a.status=="PENDING"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} />
                ))}
            </div>
            <hr />
            <h3>Poslane ponude (na čekanju)</h3>
            <div id="offer-view">
                {sentOffers.filter((a) => {return a.status=="PENDING"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr /> <hr />
            <h3>Dobivene ponude (prihvaćene)</h3>
            <div id="offer-view">
                {offers.filter((a) => {return a.status=="COMPLETED"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
            <h3>Poslane ponude (prihvaćene)</h3>
            <div id="offer-view">
                {sentOffers.filter((a) => {return a.status=="COMPLETED"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr /> <hr />
            <h3>Dobivene ponude (odbijene)</h3>
            <div id="offer-view">
                {offers.filter((a) => {return a.status=="CANCELED"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
            <h3>Poslane ponude (odbijene)</h3>
            <div id="offer-view">
                {sentOffers.filter((a) => {return a.status=="CANCELED"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} sent={true} />
                ))}
            </div>
        </>
    )
}

export default Ponude;