import Card from './Card'

const fetchedArray = [
    {
        vinylId: 1,
        vinylTitle: "Prokletije II",
        artist: "Nemeček",
        genre: "Rock",
        releaseYear: "2024",
        vinylImage: "/Prokletije2Front.jpg",
        username: "Marijanus",
        sleeveCondition: "M",
        vinylCondition: "M"
    },
    {
        vinylId: 2,
        vinylTitle: "Prokletije",
        artist: "Nemeček",
        genre: "Rock",
        releaseYear: "2021",
        vinylImage: "/Prokletije2Back.jpg",
        username: "Marijanus",
        sleeveCondition: "P",
        vinylCondition: "VG+"
    }
]

function CardList() {
    return (
        <div className='card-list'>
            { fetchedArray.map((item) => <Card vinyl={ item } key={ item.vinylId}/>) }
            <Card vinyl= { fetchedArray[0]}/>
            <Card vinyl= { fetchedArray[0]}/>
            <Card vinyl= { fetchedArray[0]}/>
            <Card vinyl= { fetchedArray[0]}/>
            <Card vinyl= { fetchedArray[0]}/>
            <Card vinyl= { fetchedArray[0]}/>
            <Card vinyl= { fetchedArray[0]}/>
        </div>
    )
}

export default CardList