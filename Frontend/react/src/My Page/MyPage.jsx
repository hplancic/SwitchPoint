import LoggedInHeader from "../Headers/LoggedInHeader";
import MyPageSidebar from "./MyPageSidebar";
import { useEffect, useState } from "react";
import MojePloce from './MojePloce';
import Ponude from './Ponude';
import PopisZelja from './PopisZelja';
import Postavke from './Postavke';

function MyPage(props) {

    useEffect(() => {
        if (props.tab) props.setSelectedTab(props.tab);
    }, []);

    return (
        <>
        <LoggedInHeader title={props.title} auth={props.auth} setAuth={props.setAuth}/>
        <div className="content">
            <MyPageSidebar 
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