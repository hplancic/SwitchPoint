import Sidebar from './Sidebar/Sidebar.jsx'
import CardList from './Content/CardList.jsx'
import SearchBar from './Content/SearchBar.jsx'
import LoggedInHeader from '../Headers/LoggedInHeader.jsx'
import AllVinyls from './AllVinyls.jsx'
import Header from '../Headers/Header.jsx'
import { useEffect, useState } from 'react'

function LoggedInHome(props) {

    const zanrovi = [
        "All", "ROCK", "JAZZ", "HIP_HOP", "CLASSICAL", "POP", "ELECTRONIC",
        "COUNTRY", "REGGAE", "BLUES", "METAL", "FOLK", "PUNK", "FUNK",
        "SOUL", "RNB", "LATIN", "DISCO", "INDIE", "WORLD", "SOUNDTRACK", "OTHER"
    ]
    const conditions = [
        'All', 'MINT', 'NEAR_MINT', 'VERY_GOOD_PLUS', 
        'VERY_GOOD', 'GOOD_PLUS', 'GOOD', 'FAIR', 'POOR'
    ]
    const conditionReducedName = {
        'All': "All",
        'MINT': "M",
        'NEAR_MINT': "NM",
        'VERY_GOOD_PLUS': "VG+",
        'VERY_GOOD': "VG",
        'GOOD_PLUS': "G+",
        'GOOD': "G",
        'FAIR':"F",
        'POOR':"P"
    };
    const selectedList = (array) => {
        let a = {};
        for (let e in array) {
            a[array[e]] = array[e]=="All" ? 1 : 0;
        }
        return a;
    }

    const [selectedZanrovi, setSelectedZanrovi] = useState(selectedList(zanrovi));
    const [selectedStanjaPloce, setSelectedStanjaPloce] = useState(selectedList(conditions.map((e) => {return conditionReducedName[e]})));
    const [selectedStanjaOmota, setSelectedStanjaOmota] = useState(selectedList(conditions.map((e) => {return conditionReducedName[e]})));
    const [yearMin, setYearMin] = useState(1920);
    const [yearMax, setYearMax] = useState(2024);

    const [search, setSearch] = useState("");

    const [flag, setFlag] = useState(false);

    const filterSelect = () => {
        //console.log("CHANGE", selectedStanjaPloce);
        if (flag) setFlag(false);
        else setFlag(true);
    };

    return (
        <>
        {props.auth.isLoggedIn ? <LoggedInHeader 
            title={props.title} 
            auth={props.auth} 
            setAuth={props.setAuth}/> : <Header title={props.title} />}
        
        <div className='content'>
            <Sidebar 
                zanrovi={zanrovi}
                conditions={conditions}
                reducedConditions={conditionReducedName}
                selectedZanrovi={selectedZanrovi} 
                setSelectedZanrovi={setSelectedZanrovi}
                selectedStanjaPloce={selectedStanjaPloce}
                setSelectedStanjaPloce={setSelectedStanjaPloce}
                selectedStanjaOmota={selectedStanjaOmota}
                setSelectedStanjaOmota={setSelectedStanjaOmota}
                yearMin={yearMin}
                setYearMin={setYearMin}
                yearMax={yearMax}
                setYearMax={setYearMax}
                filterSelect={filterSelect} />
            <SearchBar
                search={search}
                setSearch={setSearch} />
            <AllVinyls 
                auth={props.auth}
                reducedConditions={conditionReducedName}
                selectedZanrovi={selectedZanrovi} 
                setSelectedZanrovi={setSelectedZanrovi}
                selectedStanjaPloce={selectedStanjaPloce}
                setSelectedStanjaPloce={setSelectedStanjaPloce}
                selectedStanjaOmota={selectedStanjaOmota}
                setSelectedStanjaOmota={setSelectedStanjaOmota}
                yearMin={yearMin}
                setYearMin={setYearMin}
                yearMax={yearMax}
                setYearMax={setYearMax}
                search={search} />
        </div>
        </>
    )
}

export default LoggedInHome