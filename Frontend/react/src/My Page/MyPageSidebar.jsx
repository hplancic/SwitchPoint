import { Link } from "react-router-dom";
import '../styles/Mypage.css';
import { useState } from "react";

function MyPageSidebar(props) {

    const tab2path = {
        "Moje ploče":"/mypage",
        "Ponude":"/ponude",
        "Popis želja":"/popis-zelja",
        "Postavke":"/postavke",
        "Korisnici":"/korisnici"
    }

    const changeTab = (e) => {
        let parent = e.target.parentElement;
        for (let i in parent.children) {
            let child = parent.children[i];
            if (child.text != undefined) {
                if (child != e.target && child.className == 'mypage-sidebar-clicked-link') {
                    child.classList.remove('mypage-sidebar-clicked-link')
                    child.classList.add('mypage-sidebar-unclicked-link')                    
                }
                if (child == e.target && child.className == 'mypage-sidebar-unclicked-link') {
                    child.classList.remove('mypage-sidebar-unclicked-link')
                    child.classList.add('mypage-sidebar-clicked-link')
                    props.setSelectedTab(child.text);
                }    
            }
        }
    }

    return (
        <>
        <div className="sidebar mypage-sidebar">
            {Object.keys(props.tabs).map((tab, index) => (
                <Link 
                    to={tab2path[tab]}
                    onClick={changeTab} 
                    className={tab==props.selectedTab ? "mypage-sidebar-clicked-link" : "mypage-sidebar-unclicked-link"} 
                    key={index}>{tab}
                </Link>
            ))}
        </div>
        </>
    )
}

export default MyPageSidebar;