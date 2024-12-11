let selectedItemsCount = 0

function updateBadge() {
    const badge = document.querySelector('.menu-badge')

    if (selectedItemsCount > 0) {
        badge.textContent = selectedItemsCount;
        badge.classList.remove('hidden')
    } else {
        badge.classList.add('hidden')
    }
}


function addItem() {
    selectedItemsCount++
    updateBadge()
}

function removeItem() {
    if (selectedItemsCount > 0) {
        selectedItemsCount--
    }
    updateBadge()
}

const wontonButtons = document.querySelectorAll('.menu-item-btn').forEach(button => {
    button.addEventListener('click', addItem)
})
const dipButtons = document.querySelectorAll('.menu-dip-btn').forEach(button => {
    button.addEventListener('click', addItem)
})
const drinkButtons = document.querySelectorAll('.menu-drink-btn').forEach(button => {
    button.addEventListener('click', addItem)
})

export {wontonButtons}
export {dipButtons}
export {drinkButtons}