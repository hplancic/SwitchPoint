import { useContext, useEffect, useState } from "react";
import ChangeLocation from "./ChangeLocation";
import axios from "axios";
import "../styles/MypageContent.css";
import { ThemeContext } from "../App";

function Postavke() {

    const [location, setLocation] = useState(null);
    const [locationSet, setLocationSet] = useState(false)
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))
    const [loadedLocationFlag, setLoadedLocationFlag] = useState(false);
    const theme = useContext(ThemeContext);

    useEffect(() => {
        //console.log("auth", auth);
        if (location == null) {
            axios.get('/api/users/username?username=' + auth.username)
            .then(response => {
                //console.log("Response", response.data);
                setLocation({latitude:response.data.latitude, longitude:response.data.longitude});
                setLoadedLocationFlag(true);
            })
            .catch(error => {
                console.log(error);
            })
        }
    }, [auth])

    useEffect(() => {
        if (location) setLocationSet(true);
    }, [location]);


    return (
        <>
            <h2 className={"title " + theme}>Postavke</h2>
            <hr />
            {!loadedLocationFlag && <h2 className={theme}>Učitavanje lokacije...</h2>}
            {locationSet && <ChangeLocation location={location} />}
        </>
    )
}

export default Postavke;