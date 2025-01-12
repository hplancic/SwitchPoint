import '../../styles/Sidebar.css';
import MultiRangeSlider from 'multi-range-slider-react'
import { useState, useEffect } from 'react'
import FilterCategorySelectMultiple from './FilterCategorySelectMultiple';
import FilterCategoryYearSelect from './FilterCategoryYearSelect';

function Sidebar(props) {

    const kategorije = {
        "Filteri":{}, 
        "Žanr":{}, 
        "Stanje ploče":{}, 
        "Stanje omota":{},
        "Godina":{}
    }

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
                    categories={props.zanrovi}
                    selected={props.selectedZanrovi}
                    setSelected={props.setSelectedZanrovi}
                    collapse={collapse}
                    initCollapse={initCollapse["Žanr"]}
                    collapseCategory={collapseCategory}
                    filterSelect={props.filterSelect} />
                <FilterCategorySelectMultiple 
                    filterName="Stanje ploče"
                    categories={props.conditions}
                    selected={props.selectedStanjaPloce}
                    setSelected={props.setSelectedStanjaPloce}
                    collapse={collapse}
                    initCollapse={initCollapse["Stanje ploče"]}
                    collapseCategory={collapseCategory}
                    filterSelect={props.filterSelect} />
                <FilterCategorySelectMultiple
                    filterName="Stanje omota"
                    categories={props.conditions}
                    selected={props.selectedStanjaOmota}
                    setSelected={props.setSelectedStanjaOmota}
                    collapse={collapse}
                    initCollapse={initCollapse["Stanje omota"]}
                    collapseCategory={collapseCategory}
                    filterSelect={props.filterSelect} />
                <FilterCategoryYearSelect 
                    filterYearMinValue={props.yearMin}
                    filterYearMaxValue={props.yearMax}
                    setFilterYearMinValue={props.setYearMin}
                    setFilterYearMaxValue={props.setYearMax}                
                    collapse={collapse}
                    initCollapse={initCollapse["Godina"]}
                    collapseCategory={collapseCategory} />
            </div>
        </div>
    )
}

export default Sidebar