
function FilterCategorySelectMultiple({filterName, categories, selected, setSelected}) {

    const collapse = {"opened":"▼", "closed":"▲"}
    const initCollapse = "opened";

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
        if (category == "All" && currentClass == type.clicked) return;
        if (currentClass == type.unclicked) {
            let a = selected;
            if (category == "All") {
                for (let s in selected) {
                    a[s] = 0;
                }
            }
            a[category] = 1;
            if (category != "All") a["All"] = 0;
            setSelected(a);
        }
        if (currentClass == type.clicked) {
            let a = selected;
            a[category] = 0;
            let allOff = true;
            for (let s in selected) {
                if (selected[s] != 0) {
                    allOff = false;
                    break;
                }
            }
            if (allOff) {
                a["All"] = 1;
            }
            setSelected(a);
        }
        console.log(selected);
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
        <>
            <div className='filter-category'>
                <div>
                    <span className='filter-category-name'>{filterName}</span>
                    <span className='filter-category-collapse' onClick={(e) => collapseCategory(e)}>{collapse[initCollapse]}</span>
                </div>
                <div className='filter-category-container' style={initCollapse=="opened" ? {display:"flex"} : {display:"none"}}>
                    {categories.map((category, index) => (
                        <div key={index} className={category=="All" ? 'filter-category-clicked' : 'filter-category-unclicked'} onClick={(e) => filterCategoryClick(e)}>{category}</div>
                    ))}
                </div>
                <hr />
            </div>
        </>
    )
}

export default FilterCategorySelectMultiple;