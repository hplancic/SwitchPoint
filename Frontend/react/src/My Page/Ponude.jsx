import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Offers.css"
import Card from "../Front Page/Content/Card";
import Ponuda from "./Ponuda";

function Ponude() {

    const [offers, setOffers] = useState([]);
    const [sentOffers, setSentOffers] = useState([]);
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);

    const collapse = (e) => {
        let element = e.target;
        let nextSibling = element.nextSibling;
        let isHidden = nextSibling.style.display=="none"
        if (!isHidden) nextSibling.style.display = "none";
        else nextSibling.style.display = "flex";
    };

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                axios.get('/api/transactions/received/' + userId)
                    .then(response => {
                        console.log("OFFERS:", response.data);
                        setOffers(response.data);
                        setFlag1(true);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                axios.get('/api/transactions/sent/' + userId)
                    .then(response => {
                        setSentOffers(response.data)
                        setFlag2(true);
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
            <h2 className="offer-title" onClick={(e) => collapse(e)}>Dobivene ponude (na čekanju)</h2>
            <div id="offer-view">
                {!flag1 && <h2>Učitavanje dobivenih ponuda...</h2>}
                {flag1 && offers.filter((a) => {return a.status=="PENDING"}).length==0 && <h2>Nema ponuda.</h2>}
                {offers.filter((a) => {return a.status=="PENDING"}).map((offer, index) => (
                    <Ponuda key={index} index={index} offer={offer} />
                ))}
            </div>
            <hr />
            <h2 className="offer-title" onClick={(e) => collapse(e)}>Poslane ponude (na čekanju)</h2>
            <div id="offer-view">
                {!flag2 && <h2>Učitavanje poslanih ponuda...</h2>}
                {flag2 && sentOffers.filter((a) => {return a.status=="PENDING"}).length==0 && <h2>Nema ponuda.</h2>}
                {sentOffers.filter((a) => {return a.status=="PENDING"}).map((offer, index) => (
                    <Ponuda key={index} index={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
            <h2 className="offer-title accepted" onClick={(e) => collapse(e)}>Dobivene ponude (prihvaćene)</h2>
            <div id="offer-view">
                {!flag1 && <h2>Učitavanje dobivenih ponuda...</h2>}
                {flag1 && offers.filter((a) => {return a.status=="COMPLETED"}).length==0 && <h2>Nema ponuda.</h2>}
                {offers.filter((a) => {return a.status=="COMPLETED"}).map((offer, index) => (
                    <Ponuda key={index} index={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
            <h2 className="offer-title accepted" onClick={(e) => collapse(e)}>Poslane ponude (prihvaćene)</h2>
            <div id="offer-view">
                {!flag2 && <h2>Učitavanje poslanih ponuda...</h2>}
                {flag2 && sentOffers.filter((a) => {return a.status=="COMPLETED"}).length==0 && <h2>Nema ponuda.</h2>}
                {sentOffers.filter((a) => {return a.status=="COMPLETED"}).map((offer, index) => (
                    <Ponuda key={index} index={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
            <h2 className="offer-title declined" onClick={(e) => collapse(e)}>Dobivene ponude (odbijene)</h2>
            <div id="offer-view">
                {!flag1 && <h2>Učitavanje dobivenih ponuda...</h2>}
                {flag1 && offers.filter((a) => {return a.status=="CANCELED"}).length==0 && <h2>Nema ponuda.</h2>}
                {offers.filter((a) => {return a.status=="CANCELED"}).map((offer, index) => (
                    <Ponuda key={index} index={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
            <h2 className="offer-title declined" onClick={(e) => collapse(e)}>Poslane ponude (odbijene)</h2>
            <div id="offer-view">
                {!flag2 && <h2>Učitavanje poslanih ponuda...</h2>}
                {flag2 && sentOffers.filter((a) => {return a.status=="CANCELED"}).length==0 && <h2>Nema ponuda.</h2>}
                {sentOffers.filter((a) => {return a.status=="CANCELED"}).map((offer, index) => (
                    <Ponuda key={index} index={index} offer={offer} sent={true} />
                ))}
            </div>
            <hr />
        </>
    )
}

export default Ponude;