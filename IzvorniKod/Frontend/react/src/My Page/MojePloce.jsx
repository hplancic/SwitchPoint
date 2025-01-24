import NewVinyl from "./NewVinyl";
import { useEffect, useState, useReducer, useContext } from "react";
import axios from "axios";
import Card from "../Front Page/Content/Card";
import "../styles/MypageContent.css"
import { ThemeContext } from "../App";

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

function MojePloce() {

    const [userVinyls, setUserVinyls] = useState([]);
    const [flag, setFlag] = useState(false);
    const theme = useContext(ThemeContext);

    const openNewVinylPopUp = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'grid';
    }

    useEffect(() => {
        let username = JSON.parse(localStorage.getItem('auth')).username;
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                axios.get('/api/users/' + userId + '/vinyls')
                    .then(response => {
                        setUserVinyls(response.data);
                        setFlag(true);
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
        console.log(userVinyls);
    }, [userVinyls]);

    return (
        <>
            <div className="mypage-mojeploce">
                <div className="mypage-top-content">
                    <h2 className={"title " + theme}>Moje ploče</h2>
                    <button className="mypage-top-content-button" onClick={() => openNewVinylPopUp()}>Dodaj Ploču</button>
                </div>
                <hr style={{color:'#313131', marginBottom:'30px', height:'1px'}}/>
                <NewVinyl/>
                <div className="card-list">
                    {!flag && <h2 className={theme}>Učitavanje ploča...</h2>}
                    {flag && userVinyls.length==0 && <h2 className={theme}>Nema ploča.</h2>}
                    {userVinyls.map((userVinyl, index) => (
                        <Card 
                            key={index}
                            type={"USER_CARD"}
                            data={userVinyl}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MojePloce;