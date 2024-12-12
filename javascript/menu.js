
export function renderMenu(menuData) {
    const menuWontonContainer = document.getElementById("wonton-container")
    const menuDipsContainer = document.getElementById("dips-container")
    const menuDrinksContainer = document.getElementById("drinks-container")
	const dipPrice = document.getElementById("dipPrice")
	const drinkPrice = document.getElementById("drinkPrice")

    menuData.forEach(item => {
        const button = document.createElement('button')
        button.classList.add('menu-item-btn')

        // render wontons
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

        // render dips
        } else if (item.type === 'dip') {
            button.classList.add('menu-dip-btn')
            button.textContent = `${item.name}`
            menuDipsContainer.appendChild(button)
			dipPrice.innerHTML = `${item.price}` + " SEK"

        // render drinks
        } else if (item.type === 'drink') {
            button.classList.add('menu-drink-btn')
            button.textContent = `${item.name}`
			drinkPrice.innerHTML = `${item.price}` + " SEK"
            menuDrinksContainer.appendChild(button)
        }
    })
}