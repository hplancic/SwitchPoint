import { Link } from "react-router-dom";
import '../styles/MyPage.css';
import { useState } from "react";

function MyPageSidebar({tabs, selectedTab, setSelectedTab}) {

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
                    setSelectedTab(child.text);
                }    
            }
        }
    }

    return (
        <>
        <div className="sidebar mypage-sidebar">
            {Object.keys(tabs).map((tab, index) => (
                <Link 
                    to='/mypage'
                    onClick={changeTab} 
                    className={tab==selectedTab ? "mypage-sidebar-clicked-link" : "mypage-sidebar-unclicked-link"} 
                    key={index}>{tab}
                </Link>
            ))}
        </div>
        </>
    )
}

export default MyPageSidebar;