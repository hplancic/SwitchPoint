import Card from "./Content/Card";
import { useEffect, useState } from "react";

export default function AllVinylsList(props) {
    
    const [receiverUserVinylIds, setReceiverUserVinylIds] = useState(null);
    const [myVinyls, setMyVinyls] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);

    return (
        <div className="card-list">
            {Array.from(props.allVinyls).filter((a) => {
                    return a.user.username != JSON.parse(localStorage.getItem("auth")).username
                }).filter((a) => {
                    // filter zanrovi
                    return props.selectedZanrovi["All"]==1 ? a : props.selectedZanrovi[a.vinyl.genre] == 1
                }).filter((a) => {
                    // filter stanja ploce
                    return props.selectedStanjaPloce["All"]==1 ? a : props.selectedStanjaPloce[props.reducedConditions[a.vinylCondition]] == 1
                }).filter((a) => {
                    // filter stanja omota
                    return props.selectedStanjaOmota["All"]==1 ? a : props.selectedStanjaOmota[props.reducedConditions[a.sleeveCondition]] == 1
                }).filter((a) => {
                    // filter godina
                    return a.vinyl.releaseYear >= props.yearMin && a.vinyl.releaseYear <= props.yearMax
                }).filter((a) => {
                    // search artist and album
                    let condition = props.search==[""] ? true : props.search.split(" ").filter((b) => {return b!=""}).map((e) => {
                        return a.vinyl.artist.toUpperCase().startsWith(e.toUpperCase()) || a.vinyl.vinylTitle.toUpperCase().startsWith(e.toUpperCase())
                    }).every((c) => c==true);
                    return condition
                }).map((userVinyl, index) => (
                    <Card
                        auth={props.auth}
                        senderId={senderId}
                        setSenderId={setSenderId}
                        receiverId={receiverId}
                        setReceiverId={setReceiverId}
                        myVinyls={myVinyls}
                        setMyVinyls={setMyVinyls}
                        receiverUserVinylIds={receiverUserVinylIds}
                        setReceiverUserVinylIds={setReceiverUserVinylIds}
                        data={userVinyl}
                        key={index}
                        type={JSON.parse(localStorage.getItem("auth")).isLoggedIn ? "CHANGE_CARD" : ""}/>
            ))}
        </div>
    )
}