

export function renderMenu(menuData) {
    const menuWontonContainer = document.getElementById('wonton-container')
    const menuDipsContainer = document.getElementById('dips-container')
    const menuDrinksContainer = document.getElementById('drinks-container')
    const dipPrice = document.getElementById('dipPrice')
    const drinkPrice = document.getElementById('drinkPrice')

    menuWontonContainer.innerHTML = '' // clearing containers to avoid duplication
    menuDipsContainer.innerHTML = ''
    menuDrinksContainer.innerHTML = ''

    menuData.forEach(item => {
        const button = document.createElement('button')
        button.classList.add('menu-item-btn')
        button.setAttribute('data-id', item.id)

        if (item.type === 'wonton') {
            button.innerHTML = `
                <div class="menu-item-name-container">
                    <p class="menu-item-name-price">${item.name}</p>
                    <span class="menu-item-dots"></span>
                    <p class="menu-item-name-price">${item.price} SEK</p>
                </div>
                <p class="menu-item-ingredients">${item.ingredients.join(', ')}</p>
            `
            menuWontonContainer.appendChild(button)
        } else if (item.type === 'dip') {
            button.classList.add('menu-dip-btn')
            button.textContent = `${item.name}`
            menuDipsContainer.appendChild(button)
            dipPrice.textContent = `${item.price} SEK`
        } else if (item.type === 'drink') {
            button.classList.add('menu-drink-btn')
            button.textContent = `${item.name}`
            drinkPrice.textContent = `${item.price} SEK`
            menuDrinksContainer.appendChild(button)
        }
    })

}
