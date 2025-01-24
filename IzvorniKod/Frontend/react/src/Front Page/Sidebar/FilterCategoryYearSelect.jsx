import MultiRangeSlider from 'multi-range-slider-react'

function FilterCategoryYearSelect({filterYearMinValue, filterYearMaxValue, setFilterYearMinValue, setFilterYearMaxValue, collapse, initCollapse, collapseCategory}) {

    const handleFilterYearInput = (e) => {
        setFilterYearMinValue(e.minValue)
        setFilterYearMaxValue(e.maxValue)
    }



    return (
        <>
        <div className='filter-category'>
            <div className='filter-category-name' onClick={(e) => collapseCategory(e)}>
                <span className="filter-category-arrow">{collapse[initCollapse]}</span>
                Godina{/* : {filterYearMinValue} do {filterYearMaxValue} */}
            </div>
            <MultiRangeSlider
                min={1920}
                max={new Date().getFullYear()}
                minValue={filterYearMinValue}
                maxValue={filterYearMaxValue}
                step={1}
                onInput={(e) => {
                    handleFilterYearInput(e);
                }}
                ruler={false}
                style={initCollapse=="opened" ? {display:"flex"} : {display:"none"}}
            />
        </div>
        </>
    )
}

export default FilterCategoryYearSelect;