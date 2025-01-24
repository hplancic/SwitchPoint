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
                    let keywords = a.vinyl.artist.toUpperCase().split(" ").concat(a.vinyl.vinylTitle.toUpperCase().split(" "));
                    let condition = props.search==[""] ? true : props.search.toUpperCase().split(" ").filter((b) => {return b!=""}).map((e) => {
                        let test = keywords.filter((b) => {return b!=""}).map((keyword) => {
                            return keyword.startsWith(e);
                        }).includes(true);
                        return test;
                    }).every((c) => c==true);
                    return condition
                }).map((userVinyl, index) => (
                    <Card
                        auth={props.auth}
                        userData={props.userData}
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