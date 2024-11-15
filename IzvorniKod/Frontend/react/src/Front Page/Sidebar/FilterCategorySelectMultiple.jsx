
function FilterCategorySelectMultiple({filterName, categories, selected, setSelected, collapse, initCollapse, collapseCategory}) {

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
            let a = selected;
            // Ako smo kliknuli na kategoriju 'All', sve ostale kategorije treba ugasiti
            if (category == "All") {
                for (let s in selected) {
                    a[s] = 0;
                }
            }
            // Kategoriju na koju smo kliknuli treba upaliti
            a[category] = 1;
            // Ako smo kliknuli na kategoriju koja nije 'All' moramo ugasiti 'All'
            if (category != "All") a["All"] = 0;
            // Ažuriraj vrijednosti state-a selected
            setSelected(a);
        }
        // Ako smo kliknuli na kategoriju koja je kliknuta, ali nije 'All'
        if (currentClass == type.clicked) {
            let a = selected;
            // Ugasi tu kategoriju
            a[category] = 0;
            // Provjeri jesu li sve kategorije ugašene
            allOff = true;
            for (let s in selected) {
                if (selected[s] != 0) {
                    allOff = false;
                    break;
                }
            }
            // Ako su sve kategorije ugašene, upali, 'All' kategoriju
            if (allOff) {
                a["All"] = 1;
            }
            // Ažuriraj vrijednosti
            setSelected(a);
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
            if (!isValidClass(selected[child.innerText], childClass)) {
                child.classList.remove(childClass);
                child.classList.add(changeClass[childClass]);
            }
        }
    }

    return (
        <>
            <div className='filter-category'>
                <div className='filter-category-name' onClick={(e) => collapseCategory(e)}>
                    <span className="filter-category-arrow">{collapse[initCollapse]}</span>
                    {filterName}
                </div>
                <div className='filter-category-container' style={initCollapse=="opened" ? {display:"flex"} : {display:"none"}}>
                    {categories.map((category, index) => (
                        <div key={index} className={category=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{category}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FilterCategorySelectMultiple;