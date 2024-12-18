import NewVinyl from "./NewVinyl";
import NewVinyl2 from "./NewVinyl2";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import Card from "../Front Page/Content/Card";

function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}

function MojePloce() {

    const [userVinyls, setUserVinyls] = useState([]);

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
                        })
                        .catch(error => {
                            console.log(error);
                        })
                
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <>
            <div className="mypage-mojeploce">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <h2>Moje ploče</h2>
                    <button className="add-vinyl-button" onClick={() => openNewVinylPopUp()}>Add a vinyl</button>
                </div>
                <hr style={{color:'#313131', marginBottom:'30px', height:'1px'}}/>
                <NewVinyl/>
                <div className="card-list">
                    {userVinyls.map((userVinyl, index) => (
                        <Card 
                            key={index}
                            vinyl={{
                                vinylImage: userVinyl.image ? 'data:image/png;base64,' + userVinyl.image.imageData : '../../public/unavailable-image.jpg',
                                artist:userVinyl.vinyl.artist,
                                vinylTitle:userVinyl.vinyl.vinylTitle,
                                genre:userVinyl.vinyl.genre,
                                releaseYear:userVinyl.vinyl.releaseYear,
                                vinylCondition:userVinyl.vinylCondition,
                                sleeveCondition:userVinyl.sleeveCondition
                            }}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default MojePloce;