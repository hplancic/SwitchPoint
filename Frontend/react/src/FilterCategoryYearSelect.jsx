import MultiRangeSlider from 'multi-range-slider-react'

function FilterCategoryYearSelect({filterYearMinValue, filterYearMaxValue, setFilterYearMinValue, setFilterYearMaxValue}) {

    const handleFilterYearInput = (e) => {
        setFilterYearMinValue(e.minValue)
        setFilterYearMaxValue(e.maxValue)
    }

    return (
        <>
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
        </>
    )
}

export default FilterCategoryYearSelect;