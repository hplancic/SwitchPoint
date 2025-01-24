import { useEffect } from "react";

function FilterCategorySelectMultiple(props) {

    // funkcija koja se pozove kada se klikne na neku kategoriju
    const filterCategoryClick = (e) => {
        let category = e.target.innerText;
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
        // varijabla allOff će provjeravati ako su sve kategorije ugašene,
        //      neka se onda upali 'All' kategorija
        let allOff = false;
        // Ako smo kliknuli na kategoriju 'All', a ona je već kliknuta, ne treba ništa napraviti
        if (category == "All" && currentClass == type.clicked) return;
        // Ako smo kliknuli na kategoriju koja nije kliknuta
        if (currentClass == type.unclicked) {
            let a = props.selected;
            // Ako smo kliknuli na kategoriju 'All', sve ostale kategorije treba ugasiti
            if (category == "All") {
                for (let s in props.selected) {
                    a[s] = 0;
                }
            }
            // Kategoriju na koju smo kliknuli treba upaliti
            a[category] = 1;
            // Ako smo kliknuli na kategoriju koja nije 'All' moramo ugasiti 'All'
            if (category != "All") a["All"] = 0;
            // Ažuriraj vrijednosti state-a selected
            props.setSelected(a);
        }
        // Ako smo kliknuli na kategoriju koja je kliknuta, ali nije 'All'
        if (currentClass == type.clicked) {
            let a = props.selected;
            // Ugasi tu kategoriju
            a[category] = 0;
            // Provjeri jesu li sve kategorije ugašene
            allOff = true;
            for (let s in props.selected) {
                if (props.selected[s] != 0) {
                    allOff = false;
                    break;
                }
            }
            // Ako su sve kategorije ugašene, upali, 'All' kategoriju
            if (allOff) {
                a["All"] = 1;
            }
            // Ažuriraj vrijednosti
            props.setSelected(a);
        }
        // Prođi kroz sve kategorije
        let parent = e.target.parentElement;
        for (let index in parent.children) {
            let child = parent.children[index];
            let childClass = child.className;
            // Provjera je li dijete zapravo element/kategorija ili je neka funkcija
            if (typeof(child) != 'object') continue;
            // Ako klasa kategorije ne odgovara vrijednosti u state-u selected,
            //          onda promijeni classu
            if (!isValidClass(props.selected[child.innerText], childClass)) {
                child.classList.remove(childClass);
                child.classList.add(changeClass[childClass]);
            }
        }
        props.filterSelect();
    }

    return (
        <>
            <div className='filter-category'>
                <div className='filter-category-name' onClick={(e) => props.collapseCategory(e)}>
                    <span className="filter-category-arrow">{props.collapse[props.initCollapse]}</span>
                    {props.filterName}
                </div>
                <div className='filter-category-container' style={props.initCollapse=="opened" ? {display:"flex"} : {display:"none"}}>
                    {props.categories.map((category, index) => (
                        <div key={index} className={category=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{category}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FilterCategorySelectMultiple;