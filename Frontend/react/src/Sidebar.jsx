import './Sidebar.css';
import MultiRangeSlider from 'multi-range-slider-react'
import { useState } from 'react'
import FilterCategorySelectMultiple from './FilterCategorySelectMultiple';
import FilterCategoryYearSelect from './FilterCategoryYearSelect';

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
    const selectedList = (array) => {
        let a = {};
        for (let e in array) {
            a[array] = e=="All" ? 1 : 0;
        }
        return a;
    }
    const [selectedZanrovi, setSelectedZanrovi] = useState(selectedList(zanrovi));

    const [yearMin, setYearMin] = useState(1945)
    const [yearMax, setYearMax] = useState(1990)

    return (
        <div className="sidebar">
            <div>Filter</div>
            <hr></hr>

            <FilterCategorySelectMultiple 
                filterName="Žanr" 
                categories={zanrovi}
                selected={selectedZanrovi}
                setSelected={setSelectedZanrovi} />
            <FilterCategorySelectMultiple filterName="Stanje ploče" categories={stanjaPloce}/>
            <FilterCategorySelectMultiple filterName="Stanje omota" categories={stanjaOmota}/>

            <FilterCategoryYearSelect 
                filterYearMinValue={yearMin}
                filterYearMaxValue={yearMax}
                setFilterYearMinValue={setYearMin}
                setFilterYearMaxValue={setYearMax}/>
        </div>
    )
}

export default Sidebar