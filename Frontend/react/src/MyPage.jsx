import LoggedInHeader from "./LoggedInHeader";
import MyPageSidebar from "./MyPageSidebar";
import { useState } from "react";
import MojePloce from './MojePloce';
import Ponude from './Ponude';
import PopisZelja from './PopisZelja';
import Postavke from './Postavke';

function MyPage({auth, setAuth}) {

    const [tabs, setTabs] = useState({
        'Moje ploče':<MojePloce />,
        'Ponude':<Ponude />,
        'Popis želja':<PopisZelja />,
        'Postavke':<Postavke />
    });

    const [selectedTab, setSelectedTab] = useState(Object.keys(tabs)[0]);

    return (
        <>
        <LoggedInHeader auth={auth} setAuth={setAuth}/>
        <div className="content">
            <MyPageSidebar 
                tabs={tabs} 
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}/>
            <div className="mypage-tab-content">{tabs[selectedTab]}</div>
        </div>
        </>
    )
}

export default MyPage;