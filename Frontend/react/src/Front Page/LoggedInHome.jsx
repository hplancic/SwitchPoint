import Sidebar from './Sidebar/Sidebar.jsx'
import CardList from './Content/CardList.jsx'
import SearchBar from './Content/SearchBar.jsx'
import LoggedInHeader from '../Headers/LoggedInHeader.jsx'
import AllVinyls from './AllVinyls.jsx'
import Header from '../Headers/Header.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
    const [yearMax, setYearMax] = useState(new Date().getFullYear());
    const [userData, setUserData] = useState(localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).userData : null);

    const [offers, setOffers] = useState(null);
    const [offersFlag, setOffersFlag] = useState(false);

    const [search, setSearch] = useState("");

    const [flag, setFlag] = useState(false);

    const filterSelect = () => {
        //console.log("CHANGE", selectedStanjaPloce);
        if (flag) setFlag(false);
        else setFlag(true);
    };

    useEffect(() => {
        if (props.auth.isLoggedIn) {
            if (userData == null) {
                axios.get('/api/users/username?username=' + JSON.parse(localStorage.getItem('auth')).username)
                .then(response => {
                    setUserData(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
            }
            let username = JSON.parse(localStorage.getItem('auth')).username;
            axios.get('/api/users/username?username=' + username)
                .then(response => {
                    let userId = response.data.userId;
                    axios.get('/api/transactions/received/' + userId)
                        .then(response => {
                            //console.log("OFFERS:", response.data);
                            setOffers(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                })
                .catch(error => {
                    console.log(error);
                })    
        }
    }, []);

    useEffect(() => {
        if (offers) setOffersFlag(true);
    }, [offers]);

    return (
        <>
        {props.auth.isLoggedIn ? <LoggedInHeader
            title={props.title} 
            auth={props.auth} 
            setAuth={props.setAuth}
            numberOfOffers={offersFlag && offers.filter((e) => {return e.status=="PENDING"}).length} /> : <Header title={props.title} />}
        
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
                userData={userData}
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