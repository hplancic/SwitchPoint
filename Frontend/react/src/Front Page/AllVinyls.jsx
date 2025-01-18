import { useState, useEffect } from "react";
import axios from "axios";
import AllVinylsList from "./AllVinylsList";

export default function AllVinyls(props) {

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
        <>
            {flag && <AllVinylsList
                        auth={props.auth}
                        userData={props.userData}
                        allVinyls={allVinyls} 
                        reducedConditions={props.reducedConditions}
                        selectedZanrovi={props.selectedZanrovi} 
                        setSelectedZanrovi={props.setSelectedZanrovi}
                        selectedStanjaPloce={props.selectedStanjaPloce}
                        setSelectedStanjaPloce={props.setSelectedStanjaPloce}
                        selectedStanjaOmota={props.selectedStanjaOmota}
                        setSelectedStanjaOmota={props.setSelectedStanjaOmota}
                        yearMin={props.yearMin}
                        setYearMin={props.setYearMin}
                        yearMax={props.yearMax}
                        setYearMax={props.setYearMax}
                        search={props.search} />}
        </>
    )
}