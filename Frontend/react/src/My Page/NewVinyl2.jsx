import { useEffect, useState } from "react";
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import ConditionSelect from "./ConditionSelect";

function NewVinyl2() {

    const [vinyls, setVinyls] =  useState(JSON.parse(localStorage.getItem('vinyls')) || []);
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [selectedArtist, setSelectedArtist] = useState(null);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedVinylCondition, setSelectedVinylCondition] = useState(null);
    const [selectedSleeveCondition, setSelectedSleeveCondition] = useState(null);
    const [vinylIds, setVinylIds] = useState({});
    //const [albums, setAlbums] = useState([]);
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    useEffect(() => {
        //console.log("CHECK 2", vinyls);
        localStorage.setItem('vinyls', JSON.stringify(vinyls));
        let artistAlbumsTemp = {}
        let vinylIdsTemp = {}
        for (let index in vinyls) {
            let vinyl = vinyls[index];
            let artist = vinyl.artist;
            let album = vinyl.vinylTitle;
            let vinylId = vinyl.vinylId;
            if (!(artist in artistAlbumsTemp)) {
                artistAlbumsTemp[artist] = new Array();
            }
            artistAlbumsTemp[artist].push(album);
            if (!(artist in vinylIdsTemp)) {
                vinylIdsTemp[artist] = {};
            }
            vinylIdsTemp[artist][album] = vinylId;
        }
        setArtistAlbums(artistAlbumsTemp);
        setVinylIds(vinylIdsTemp);
        //console.log("CHECK 3", artistAlbums, vinylIds);
    }, [vinyls]);

    useEffect(() => {
        //console.log('USEEFFECT');
        axios.get('/api/vinyls')
        .then(response => {
            //console.log("CHECK 1", response.data.content);
            return response.data.content;
        })
        .then(content => {
            // save all vinyl data to state vinyls
            setVinyls(content);
            //console.log("CHECK 1.5", content);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const closePopUp = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'none';    
    }

    const addVinyl = (e) => {
        e.preventDefault();
        //console.log(selectedArtist, selectedAlbum, selectedVinylCondition, selectedSleeveCondition);
        let username = JSON.parse(localStorage.getItem('auth')).username;
        closePopUp();
        axios.get('/api/users/username?username=' + username)
            .then(response => {
                let userId = response.data.userId;
                //console.log(artistAlbums, vinylIds);
                let vinylId = vinylIds[selectedArtist][selectedAlbum];
                let postPATH = '?vinylId='+vinylId+'&vinylCondition='+selectedVinylCondition+'&sleeveCondition='+selectedSleeveCondition;
                    axios.post('/api/users/' + userId + '/vinyls' + postPATH)
                        .then(response => {
                            console.log("Successfully added a new vinyl.");
                            window.location.reload();
                        })
                        .catch(error => {
                            console.log(error);
                        })
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <>
            <div id="overlay" onClick={closePopUp}>
                <div id="newvinyl-popup" onClick={ e => e.stopPropagation() }>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                        <h2>Add a new vinyl</h2>
                        <button onClick={() => closePopUp()}>X</button>
                    </div>
                    <form action="post" onSubmit={addVinyl}>

                        <label htmlFor="image">Upload image</label>
                        <div style={{display:'flex'}}>
                            <input type="file" src={file} onChange={handleChange} style={{maxWidth:'50%'}}/>
                            <img className='add-vinyl-img' src={file} />
                        </div>

                        <label htmlFor="artist">Select artist</label>
                        <Dropdown value={selectedArtist} onChange={(e) => {setSelectedArtist(e.value); setSelectedAlbum(null)}} options={Object.keys(artistAlbums)} optionLabel="name" 
                            editable placeholder="Select an artist" className="w-full md:w-14rem" />

                        <label htmlFor="album">Select album</label>
                        <Dropdown value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.value)} options={artistAlbums[selectedArtist]} optionLabel="name" 
                            editable placeholder="Select an album" className="w-full md:w-14rem" />

                        <div style={{display:'flex'}}>
                            <div style={{maxWidth:'300px'}}>
                                <label>Select vinyl condition</label>                    
                                <ConditionSelect
                                    setSelected={setSelectedVinylCondition} />
                            </div>
                            <div style={{maxWidth:'300px'}}>
                                <label>Select sleeve condition</label>
                                <ConditionSelect
                                    setSelected={setSelectedSleeveCondition} />
                            </div>
                        </div>


                        <input type="submit" value="Add vinyl" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default NewVinyl2;