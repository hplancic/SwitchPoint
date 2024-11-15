import '../../styles/Sidebar.css';
import MultiRangeSlider from 'multi-range-slider-react'
import { useState, useEffect } from 'react'
import FilterCategorySelectMultiple from './FilterCategorySelectMultiple';
import FilterCategoryYearSelect from './FilterCategoryYearSelect';

function Sidebar() {

    const kategorije = {
        "Filteri":{}, 
        "Žanr":{}, 
        "Stanje ploče":{}, 
        "Stanje omota":{},
        "Godina":{}
    }

    const stanjaPloce = [
        "All",
        "Mint (M)", 
        "Near Mint (NM)", 
        "Very Good Plus (VG+)",
        "Very Good (VG)",
        "Good (G)",
        "Poor (P) / Fair (F)"
    ]
    const stanjaPloceKratice = [
        "All",
        "M", 
        "NM", 
        "VG+",
        "VG",
        "G",
        "P / F"
    ]

    const stanjaOmota = [
        "All",
        "Mint (M)", 
        "Near Mint (NM)", 
        "Very Good Plus (VG+)",
        "Very Good (VG)",
        "Good (G)"
    ]
    const zanrovi = [
        "All", "Rock", "Pop", "Jazz", "Disco",
        "Soul & Funk", "Country", "Blues", "Rap & Hip Hop"
    ]
    const selectedList = (array) => {
        let a = {};
        for (let e in array) {
            a[array[e]] = e=="All" ? 1 : 0;
        }
        return a;
    }
    const [selectedZanrovi, setSelectedZanrovi] = useState(selectedList(zanrovi));
    const [selectedStanjaPloce, setSelectedStanjaPloce] = useState(selectedList(stanjaPloce));
    const [selectedStanjaOmota, setSelectedStanjaOmota] = useState(selectedList(stanjaOmota));

    const [yearMin, setYearMin] = useState(1945)
    const [yearMax, setYearMax] = useState(1990)

    const collapse = {"opened":"▼", "closed":"▲"}
    const initCollapses = () => {
        let o = {};
        for (let kategorija in kategorije) {
            o[kategorija] = JSON.parse(localStorage.getItem('initCollapses'))?.[kategorija];
            if (o[kategorija] === undefined) o[kategorija] = 'opened';
        }
        localStorage.setItem('initCollapses', JSON.stringify(o));
        return o;
    }
    const initCollapse = initCollapses();

    // funkcija koja se pozove kad se klikne na naziv ili strelicu filtera
    const collapseCategory = (e) => {
        // Provjeri je li kliknuta strelica ili naziv i prema tome odredi vrijednost varijable container
        let clickedOnArrow = e.target.className=='filter-category-arrow' || e.target.className=='filter-title-arrow';
        let categoryName = clickedOnArrow ? e.target.parentElement.innerText : e.target.innerText;
        categoryName = categoryName.substring(1);
        let container = clickedOnArrow ? e.target.parentElement.nextSibling : e.target.nextSibling;
        let arrow = container.style.display=='none' ? '▲' : '▼';
        
        const changeText = {
            "▼":"▲",
            "▲":"▼"
        }
        const changeInitCollapse = {
            "opened":"closed",
            "closed":"opened"        
        }
        const changeDisplay = {
            "▼":"none",
            "▲":"flex"
        }
        // Promijeni strelicu ovisno o tome je li kliknuta strelica ili naziv
        if (clickedOnArrow) e.target.innerText = changeText[arrow];
        else e.target.firstElementChild.innerText = changeText[arrow];
        // Promijeni vrijednost 'display' za container.
        container.style.display = changeDisplay[arrow];
        // Zabilježi u localstorage je li kategorija zatvorena ili otvorena
        let ic = JSON.parse(localStorage.getItem('initCollapses'));
        ic[categoryName] = changeInitCollapse[ic[categoryName]];
        localStorage.setItem('initCollapses', JSON.stringify(ic));
    }

    return (
        <div className="sidebar">
            <div className='filter-title' onClick={(e) => collapseCategory(e)}>
                <span className="filter-title-arrow">{collapse[initCollapse["Filteri"]]}</span>
                Filteri
            </div>
            <div className='filter-categories' style={initCollapse["Filteri"]=="opened" ? {display:"flex"} : {display:"none"}}>
                <FilterCategorySelectMultiple 
                    filterName="Žanr"
                    categories={zanrovi}
                    selected={selectedZanrovi}
                    setSelected={setSelectedZanrovi}
                    collapse={collapse}
                    initCollapse={initCollapse["Žanr"]}
                    collapseCategory={collapseCategory} />
                <FilterCategorySelectMultiple 
                    filterName="Stanje ploče"
                    categories={stanjaPloce}
                    selected={selectedStanjaPloce}
                    setSelected={setSelectedStanjaPloce}
                    collapse={collapse}
                    initCollapse={initCollapse["Stanje ploče"]}
                    collapseCategory={collapseCategory} />
                <FilterCategorySelectMultiple
                    filterName="Stanje omota"
                    categories={stanjaOmota}
                    selected={selectedStanjaOmota}
                    setSelected={setSelectedStanjaOmota}
                    collapse={collapse}
                    initCollapse={initCollapse["Stanje omota"]}
                    collapseCategory={collapseCategory} />
                <FilterCategoryYearSelect 
                    filterYearMinValue={yearMin}
                    filterYearMaxValue={yearMax}
                    setFilterYearMinValue={setYearMin}
                    setFilterYearMaxValue={setYearMax}                
                    collapse={collapse}
                    initCollapse={initCollapse["Godina"]}
                    collapseCategory={collapseCategory} />
            </div>
        </div>
    )
}

export default Sidebar