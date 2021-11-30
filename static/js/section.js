var header = document.getElementById("buttonBox");
var btns = header.getElementsByClassName("btnLeft");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

function selectFunction() {
    const selectBlock = document.querySelectorAll('[data-select]');
    const allLists = document.querySelectorAll('[data-list]')
    const allArrows = document.querySelectorAll('[data-arrow]')

    for (const selectItem of selectBlock) {
        const selectedItem = selectItem.querySelector('[data-selected="true"]')
        const itemsList = selectItem.querySelector('[data-list]')
        const itemOfList = selectItem.querySelectorAll('[data-item="true"]')
        const selectInput = selectItem.querySelector('[data-input]')
        const selectArrow = selectItem.querySelector('[data-arrow]')
        const selectedTitle = selectItem.querySelector('[data-selected-title]')

        selectedItem.addEventListener('click', function() {
            //remove all opened lists
            for (const a of allLists) {
                if (!itemsList.classList.contains('select__list_opened')) {
                    a.classList.remove('select__list_opened')
                }
            }

            //remove all transformed arrows
            for (const y of allArrows) {
                y.classList.remove('select__arrow_rotate')
            }

            //set open class to list of items
            if (itemsList.classList.contains('select__list_opened')) {
                itemsList.classList.remove('select__list_opened')
                selectArrow.classList.remove('select__arrow_rotate')
            } else {
                itemsList.classList.add('select__list_opened')
                selectArrow.classList.add('select__arrow_rotate')
            }
        })

        //insert value in selected and input values
        for (const item of itemOfList) {
            item.addEventListener('click', function() {
                selectedTitle.innerHTML = item.innerHTML;
                selectInput.value = item.innerHTML;
                itemsList.classList.remove('select__list_opened');
                selectArrow.classList.remove('select__arrow_rotate');
            })
        }

        //close select in other areas
        document.addEventListener('click', function(event) {
            if (event.target.dataset.selected !== "true" && event.target.dataset.item !== "true") {
                itemsList.classList.remove('select__list_opened')
                selectArrow.classList.remove('select__arrow_rotate')
            }
        })
    }
}
selectFunction();