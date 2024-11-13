import NewVinyl from "./NewVinyl";

function MojePloce() {

    const openNewVinylPopUp = () => {
        let popup = document.getElementById('newvinyl-popup');
        popup.style.display = 'block';
    }

    return (
        <>
            <div className="mypage-mojeploce">
                <h2>Moje ploče</h2>
                <div className="add-vinyl-button" onClick={() => openNewVinylPopUp()}>Add vinyl</div>
                <NewVinyl />
            </div>
        </>
    )
}

export default MojePloce;