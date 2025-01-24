import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllVinylsList from "./AllVinylsList";
import { ThemeContext } from "../App";

export default function AllVinyls(props) {

    const [allVinyls, setAllVinyls] = useState([]);
    const [flag, setFlag] = useState(false);
    const theme = useContext(ThemeContext);

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
            {!flag && <h2 style={{marginLeft:"10px"}} className={theme}>Učitavanje ploča...</h2>}
            {flag && allVinyls.length==0 && <h2 style={{color:"#313131", marginLeft:"10px"}} className={theme}>Nema ploča.</h2>}
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