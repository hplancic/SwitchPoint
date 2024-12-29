import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Offers.css"
import Card from "../Front Page/Content/Card";
import Ponuda from "./Ponuda";

function Ponude() {

    const [offers, setOffers] = useState([]);

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
                
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <h1>Ponude</h1>
            <div id="offer-view">
                {offers.filter((a) => {return a.status=="PENDING"}).map((offer, index) => (
                    <Ponuda key={index} offer={offer} />
                ))}
            </div>
        </>
    )
}

export default Ponude;