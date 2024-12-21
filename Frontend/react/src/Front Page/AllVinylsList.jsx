import Card from "./Content/Card";

export default function AllVinylsList({allVinyls}) {
        
    return (
        <div className="card-list">
            {Array.from(allVinyls).filter((a) => {
                    return a.user.username != JSON.parse(localStorage.getItem("auth")).username
                }).map((userVinyl, index) => (
                    <Card 
                        key={index}
                        type={"CHANGE_CARD"}
                        user = {{
                            id:userVinyl.user.userId,
                            username:userVinyl.user.username,
                            latitude:userVinyl.user.latitude,
                            longitude:userVinyl.user.longitude
                        }}
                        vinyl={{
                            id: userVinyl.vinyl.vinylId,
                            vinylImage: userVinyl.image ? 'data:image/png;base64,' + userVinyl.image.imageData : '../../public/unavailable-image.jpg',
                            artist:userVinyl.vinyl.artist,
                            vinylTitle:userVinyl.vinyl.vinylTitle,
                            genre:userVinyl.vinyl.genre,
                            releaseYear:userVinyl.vinyl.releaseYear,
                            vinylCondition:userVinyl.vinylCondition,
                            sleeveCondition:userVinyl.sleeveCondition
                        }}/>
            ))}
        </div>
    )
}