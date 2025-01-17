import { useEffect, useState } from "react";
import ChangeLocation from "./ChangeLocation";
import axios from "axios";

function Postavke() {

    const [location, setLocation] = useState(null);
    const [locationSet, setLocationSet] = useState(false)
    const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('auth')))

    useEffect(() => {
        //console.log("auth", auth);
        if (location == null) {
            axios.get('/api/users/username?username=' + auth.username)
            .then(response => {
                //console.log("Response", response.data);
                setLocation({latitude:response.data.latitude, longitude:response.data.longitude});
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
            <h2>Postavke</h2>
            <hr />
            {locationSet && <ChangeLocation location={location} />}
        </>
    )
}

export default Postavke;