import { useState } from "react";

function GenreSelect({setSelected}) {

    const conditions = [
        "ROCK",
        "JAZZ",
        "HIP_HOP",
        "CLASSICAL",
        "POP",
        "ELECTRONIC",
        "COUNTRY",
        "REGGAE",
        "BLUES",
        "METAL",
        "FOLK",
        "PUNK",
        "FUNK",
        "SOUL",
        "RNB",
        "LATIN",
        "DISCO",
        "INDIE",
        "WORLD",
        "SOUNDTRACK",
        "OTHER"
    ]

    const selectedList = (array) => {
        let a = {};
        for (let e in array) {
            a[array[e]] = 0;
        }
        return a;
    }

    const filterCategoryClick = (e) => {
        let condition = e.target.innerText;
        const changeClass = {
            'filter-category-unclicked':'filter-category-clicked',
            'filter-category-clicked':'filter-category-unclicked'
        }
        const type = {
            'unclicked':'filter-category-unclicked',
            'clicked':'filter-category-clicked'
        }
        // Provjeri jesu li argumenti (1, filter-category-clicked) ili (0, filter-category-unclicked)
        // tj. hoće li trebati mijenjati classu
        const isValidClass = (zeroORone, className) => {
            return (zeroORone==0 && className==type.unclicked) 
                || (zeroORone==1 && className==type.clicked);
        }
        let currentClass = e.target.className;
        let selectedTemp = selectedList(conditions);
        selectedTemp[condition] = 1;
        setSelected(condition);
        // Prođi kroz sve kategorije
        let parent = e.target.parentElement;
        for (let index in parent.children) {
            let child = parent.children[index];
            let childClass = child.className;
            // Provjera je li dijete zapravo element/kategorija ili je neka funkcija
            if (typeof(child) != 'object') continue;
            // Ako klasa kategorije ne odgovara vrijednosti u state-u selected,
            //          onda promijeni classu
            if (!isValidClass(selectedTemp[child.innerText], childClass)) {
                child.classList.remove(childClass);
                child.classList.add(changeClass[childClass]);
            }
        }
    }

    const collapseCategory = (e) => {

    }

    return (
        <>
            <div className='filter-category'>
                <div className='filter-category-container' style={{display:"flex"}}>
                    {conditions.map((condition, index) => (
                        <div key={index} className={condition=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{condition}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default GenreSelect;