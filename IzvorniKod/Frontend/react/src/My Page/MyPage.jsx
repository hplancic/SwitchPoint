import LoggedInHeader from "../Headers/LoggedInHeader";
import MyPageSidebar from "./MyPageSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function MyPage(props) {

    const [offers, setOffers] = useState(null);
    const [offersFlag, setOffersFlag] = useState(false);


    useEffect(() => {
        if (props.tab) props.setSelectedTab(props.tab);
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                axios.get('/api/transactions/received/' + userId)
                    .then(response => {
                        //console.log("OFFERS:", response.data);
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

    useEffect(() => {
        if (offers) setOffersFlag(true);
        console.log(offers);
    }, [offers]);

    if (props.auth.isLoggedIn == false) window.location.replace("/");

    return (
        <>
        <LoggedInHeader title={props.title} auth={props.auth} setAuth={props.setAuth} numberOfOffers={offersFlag && offers.filter((e) => {return e.status=="PENDING"}).length} />
        <div className="content">
            <MyPageSidebar
                numberOfOffers={offersFlag && offers.filter((e) => {return e.status=="PENDING"}).length}
                auth={props.auth}
                tabs={props.tabs} 
                selectedTab={props.selectedTab}
                setSelectedTab={props.setSelectedTab}/>
            <div className="mypage-tab-content">{props.tabs[props.selectedTab]}</div>
        </div>
        </>
    )
}

export default MyPage;