import { useState, useEffect } from "react";
import axios from "axios";
import AllVinylsList from "./AllVinylsList";

export default function AllVinyls() {

    const [allVinyls, setAllVinyls] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        axios.get('/api/user-vinyls')
            .then(response => {
                //console.log(response.data.content);
                setAllVinyls(response.data.content);
                setFlag(true);
            })
            .catch(error => {
                console.log("Get all vinyls:", error);
            })
    }, []);

    return (
        <div>
            {flag && <AllVinylsList allVinyls={allVinyls} />}
        </div>
    )
}