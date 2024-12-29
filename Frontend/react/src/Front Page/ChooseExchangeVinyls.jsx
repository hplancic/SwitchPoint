import Card from "./Content/Card";
import "../styles/Exchange.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChooseExchangeVinyl(props) {

    //console.log("TEST 3", props.vinyls);

    const [selectedVinyls, setSelectedVinyls] = useState(new Set());

    const closePopUp = (e) => {
        if (e.target.id == "overlay" || e.target.id == "send-exchange-button") {
            let overlay = document.getElementById('overlay');
            overlay.style.display = 'none';        
        }
    }

    const sendExchangeOffer = (e) => {
        console.log("Sender Id:", props.transactionData.senderId);
        console.log("Sender UserVinyl Ids:", selectedVinyls, JSON.stringify([...selectedVinyls]));
        console.log("Receiver Id:", props.transactionData.receiverId);
        console.log("Receiver UserVinyl Ids:", props.transactionData.receiverUserVinylIds);
        const formData = new FormData();
        formData.append("senderId", props.transactionData.senderId);
        formData.append("senderUserVinylIds", JSON.stringify([...selectedVinyls]).slice(1, -1));
        formData.append("receiverId", props.transactionData.receiverId);
        formData.append("receiverUserVinylIds", JSON.stringify([...props.transactionData.receiverUserVinylIds]).slice(1,-1));
        axios.post("/api/transactions/initiate", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log("Sending exchange offer ERROR:", err);
            });
        closePopUp(e);
    };

    return (
        <div id="overlay" onClick={(e) => {closePopUp(e)}}>
            <div id="card-exchange-view"> 
                <h2 style={{color:"#000"}}>Odaberi svoje ploče koje želiš ponuditi za zamjenu</h2>
                <div id="card-exchange-cards">
                    {props.vinyls.map((vinyl, index) => (
                        <Card
                            selectedVinyls={selectedVinyls}
                            setSelectedVinyls={setSelectedVinyls}
                            data={vinyl}
                            key={index}
                            type={"EXCHANGE_CARD"}/>
                    ))}
                </div>
                <button id="send-exchange-button" onClick={(e) => sendExchangeOffer(e)}>Pošalji ponudu</button>
            </div>
        </div>
    )
}