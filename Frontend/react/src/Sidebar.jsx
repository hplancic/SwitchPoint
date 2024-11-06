import MultiRangeSlider from 'multi-range-slider-react'
import { useState } from 'react'

function Sidebar() {

    const [filterYearMinValue, setFilterYearMinValue] = useState(1945)
    const [filterYearMaxValue, setFilterYearMaxValue] = useState(1990)

    const handleFilterYearInput = (e) => {
        setFilterYearMinValue(e.minValue)
        setFilterYearMaxValue(e.maxValue)
    }

    return (
        <div className="sidebar">
            <div>Filter</div>
            <hr></hr>
            <form>
                <input type="text" placeholder="artist name" id="artistname" name="artistname"></input>
                <input type="text" placeholder="album name" id="albumname" name="albumname"></input>
                <input type="range"></input>
                <fieldset>
                    <legend>Vinyl State</legend>

                    <label for="new">New</label>
                    <input type="checkbox" id="new" name="new" value="new"></input>
                    <label for="used">Used</label>
                    <input type="checkbox" id="used" name="used" value="used"></input>
                </fieldset>
            </form>
            <div>Godina: {filterYearMinValue} do {filterYearMaxValue}</div>
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
        </div>
    )
}

export default Sidebar