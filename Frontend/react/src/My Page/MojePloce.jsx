import NewVinyl from "./NewVinyl";

function MojePloce() {

    const openNewVinylPopUp = () => {
        let overlay = document.getElementById('overlay');
        overlay.style.display = 'grid';
    }

    return (
        <>
            <div className="mypage-mojeploce">
                <h2>Moje ploče</h2>
                <button className="add-vinyl-button" onClick={() => openNewVinylPopUp()}>Add vinyl</button>
                <NewVinyl />
            </div>
        </>
    )
}

export default MojePloce;