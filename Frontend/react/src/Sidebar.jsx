import MultiRangeSlider from 'multi-range-slider-react'
import { useState } from 'react'

function Sidebar() {

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
    const initCollapse = "▲" //▼

    const [filterYearMinValue, setFilterYearMinValue] = useState(1945)
    const [filterYearMaxValue, setFilterYearMaxValue] = useState(1990)

    const handleFilterYearInput = (e) => {
        setFilterYearMinValue(e.minValue)
        setFilterYearMaxValue(e.maxValue)
    }

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
        let currentClass = e.target.className;
        e.target.classList.remove(currentClass);
        e.target.classList.add(changeClass[currentClass]);
        if (category == "All") {
            let sibling = e.target.nextSibling;
            while (sibling != null) {
                if (sibling.className == type.clicked) {
                    sibling.classList.remove(type.clicked);
                    sibling.classList.add(type.unclicked);
                }
                sibling = sibling.nextSibling;    
            }
        } else {
            let all = e.target.parentElement.firstChild;
            if (all.className == type.clicked) {
                all.classList.remove(type.clicked);
                all.classList.add(type.unclicked);
            }
        }
    }

    const collapseCategory = (e) => {
        let container = e.target.parentElement.nextSibling;
        let current = e.target.innerText;
        const changeText = {
            "▼":"▲",
            "▲":"▼"
        }
        const changeDisplay = {
            "▼":"none",
            "▲":"flex"
        }
        e.target.innerText = changeText[current];
        container.style.display = changeDisplay[current];
    }

    return (
        <div className="sidebar">
            <div>Filter</div>
            <hr></hr>

            <div className='filter-category'>
                <div>
                    <span className='filter-category-name'>Žanr</span>
                    <span className='filter-category-collapse' onClick={(e) => collapseCategory(e)}>{initCollapse}</span>
                </div>
                <div className='filter-category-container'>
                    {zanrovi.map((zanr) => (
                        <div className={zanr=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{zanr}</div>
                    ))}
                </div>
                <hr />
            </div>

            <div className='filter-category'>
                <div>
                    <span className='filter-category-name'>Stanje ploče</span>
                    <span className='filter-category-collapse' onClick={(e) => collapseCategory(e)}>{initCollapse}</span>
                </div>
                <div className='filter-category-container'>
                    {stanjaPloce.map((stanjePloce) => (
                        <div className={stanjePloce=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{stanjePloce}</div>
                    ))}
                </div>
                <hr />
            </div>

            <div className='filter-category'>
                <div>
                    <span className='filter-category-name'>Stanje omota</span>
                    <span className='filter-category-collapse' onClick={(e) => collapseCategory(e)}>{initCollapse}</span>
                </div>
                <div className='filter-category-container'>
                    {stanjaOmota.map((stanjeOmota) => (
                        <div className={stanjeOmota=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{stanjeOmota}</div>
                    ))}
                </div>
                <hr />
            </div>

            <div className='filter-category'>
                <div className='filter-category-name'>Godina: {filterYearMinValue} do {filterYearMaxValue}</div>
                <MultiRangeSlider
                    min={1920}
                    max={2024}
                    minValue={filterYearMinValue}
                    maxValue={filterYearMaxValue}
                    step={1}
                    onInput={(e) => {
                        handleFilterYearInput(e);
                    }}
                    ruler={false}
                />
                <hr />
            </div>
        </div>
            
    )
}

export default Sidebar