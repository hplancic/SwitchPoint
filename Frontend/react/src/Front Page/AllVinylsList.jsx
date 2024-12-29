import Card from "./Content/Card";
import { useState } from "react";

export default function AllVinylsList({allVinyls}) {
    
    const [receiverUserVinylIds, setReceiverUserVinylIds] = useState(null);
    const [myVinyls, setMyVinyls] = useState(null);
    const [senderId, setSenderId] = useState(null);
    const [receiverId, setReceiverId] = useState(null);

    return (
        <div className="card-list">
            {Array.from(allVinyls).filter((a) => {
                    return a.user.username != JSON.parse(localStorage.getItem("auth")).username
                }).map((userVinyl, index) => (
                    <Card
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