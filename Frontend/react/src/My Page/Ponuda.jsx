import { useEffect, useState } from "react";
import Card from "../Front Page/Content/Card"
import axios from "axios";
import ChooseExchangeVinyl from "../Front Page/ChooseExchangeVinyls";

export default function Ponuda(props) {

    const [selectedCardTheir, setSelectedCardTheir] = useState(1);
    const [selectedCardMy, setSelectedCardMy] = useState(1);
    const [senderVinyls, setSenderVinyls] = useState(null);

    const dekl = (broj) => {
        if ((broj % 10 == 2 || broj % 10 == 3 || broj % 10 == 4) && (broj != 12 || broj != 13 || broj != 14))  return "ploče";
        return "ploča";
    };

    const showPreviousVinyl = (e, whose) => {
        changeVinylShown(e, "previous", whose);
    };

    const showNextVinyl = (e, whose) => {
        changeVinylShown(e, "next", whose);
    };

    const changeVinylShown = (e, type, whose) => {
        //let wrap = e.target.closest(".offer");
        //let cardContainer = wrap.querySelector(".offer-vinyls");
        let cardContainer;
        if (whose == "my") {
            cardContainer = document.getElementById("oscmy" + props.index);
        }
        else if (whose == "their") {
            cardContainer = document.getElementById("osctheir" + props.index);
        }
        let cardArray = Array.from(cardContainer.children);
        let shownIndex = -1;
        //console.log(whose, wrap, cardContainer);
        cardArray.forEach((card, index) => {
            let display = window.getComputedStyle(card).display;
            if (display == "flex") {
                shownIndex = index;
            }
        });
        let change = {
            "next":{
                "border":cardArray.length-1,
                "new":shownIndex+1
            },
            "previous":{
                "border":0,
                "new":shownIndex-1
            }
        }
        if (shownIndex == -1) console.log("ERROR shownIndex = -1");
        else if (shownIndex == change[type].border) console.log("No more " + type + " vinyls.");
        else {
            cardArray.at(shownIndex).style.display = "none";
            cardArray.at(change[type].new).style.display = "flex";
            if (whose == "my") setSelectedCardMy(change[type].new+1);
            else if (whose == "their") setSelectedCardTheir(change[type].new+1);
        }
    };

    const acceptOffer = (e) => {
        axios.post("/api/transactions/complete/" + props.offer.transactionId)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.log("Complete transaction ERROR:", error);
            })
    };

    const cancelOffer = (e) => {
        axios.post("/api/transactions/cancel/" + props.offer.transactionId)
            .then(response => {
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.log("Cancel transaction ERROR:", error);
            })
    };

    const editOffer = (e) => {
        let senderId = props.offer.sender.userId;
        axios.get('/api/users/' + senderId + '/vinyls')
            .then(response => {
                setSenderVinyls(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    };

    useEffect(() => {
        if (senderVinyls) {
            console.log("OFFER IS ", props.offer);
            let overlay = document.getElementById('overlay');
            overlay.style.display = 'grid';
        }
    }, [senderVinyls]);

    return (
        <div className="offer">
            <h3>{props.sent ? "Želim ove ploče" : "Pošiljatelj želi ove ploče"}</h3>
            <h3>{props.sent ? "Nudim ove ploče" : "Pošiljatelj nudi ove ploče"}</h3>
            <div className="offer-vinyls my" id={"oscmy" + props.index}>
                {props.offer.userVinylsOfferedByReceiver.map((vinyl, index) => (
                    <Card
                        hide={index!=0}
                        key={index}
                        type={""}
                        data={vinyl}
                        exchangeType="EDIT"
                    />
                ))}
            </div>
            <div className="offer-vinyls their second-offer-vinyls" id={"osctheir" + props.index}>
                {props.offer.userVinylsOfferedBySender.map((vinyl, index) => (
                    <Card
                        hide={index!=0}
                        key={index}
                        type={""}
                        data={vinyl}
                        exchangeType="EDIT"
                    />
                ))}
            </div>
            <div className="offer-switch-cards">
                <button onClick={(e) => showPreviousVinyl(e, "my")} disabled={selectedCardMy==1 ? "disabled" : ""}><img src="/leftArrow.svg" /></button>
                <div className="offer-number-of-cards">
                    <h4>{selectedCardMy}/{props.offer.userVinylsOfferedByReceiver.length}</h4>
                    <h4>{props.offer.userVinylsOfferedByReceiver.length} {dekl(props.offer.userVinylsOfferedByReceiver.length)}
                    </h4>
                </div>                    
                <button onClick={(e) => showNextVinyl(e, "my")} disabled={selectedCardMy==props.offer.userVinylsOfferedByReceiver.length ? "disabled" : ""}><img src="/rightArrow.svg" /></button>
            </div>
            <div className="offer-switch-cards second-switch-cards">
                <button onClick={(e) => showPreviousVinyl(e, "their")} disabled={selectedCardTheir==1 ? "disabled" : ""}><img src="/leftArrow.svg" /></button>
                <div className="offer-number-of-cards">
                    <h4>{selectedCardTheir}/{props.offer.userVinylsOfferedBySender.length}</h4>
                    <h4>{props.offer.userVinylsOfferedBySender.length} {dekl(props.offer.userVinylsOfferedBySender.length)}
                    </h4>
                </div>
                <button onClick={(e) => showNextVinyl(e, "their")} disabled={selectedCardTheir==props.offer.userVinylsOfferedBySender.length ? "disabled" : ""}><img src="/rightArrow.svg" /></button>
            </div>
            {!props.sent && <div className="offer-buttons">
                <button className="accept-button" onClick={(e) => acceptOffer(e)}>Prihvati ponudu</button>
                <button className="change-button" onClick={(e) => editOffer(e)}>Izmjeni ponudu</button>
                <button className="cancel-button" onClick={(e) => cancelOffer(e)}>Odbaci ponudu</button>
            </div>}
            <ChooseExchangeVinyl vinyls={senderVinyls ? senderVinyls : new Array()} 
                transactionData={{
                    "senderId":props.offer.receiver.userId,
                    "receiverId":props.offer.sender.userId,
                    "receiverUserVinylIds":props.offer.userVinylsOfferedByReceiver
                }} 
                type="EDIT"
                toCancel={props.offer.transactionId}
            />
        </div>
    )
};