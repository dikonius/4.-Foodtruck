import {wontons} from "./api_data.js"
import {dips} from "./api_data.js"
import {drinks} from "./api_data.js"


// --------------------------Menu----------------------
// ------------------------Wontons--------------------
// ----getting container where buttons will be appended--------
const menuWontonContainer = document.querySelector('.menu-items')

// ----doing for loop through the group of items we dclared and populate the HTML structure
wontons.forEach(item => {
    const button = document.createElement('button')
    button.classList.add('menu-item-btn')
	button.innerHTML = `
        <div class="menu-item-name-container">
            <p class="menu-item-name-price">${item.name}</p>
            <span class="menu-item-dots"></span>
            <p class="menu-item-name-price">${item.price} SEK</p>
        </div>
        <p class="menu-item-ingredients">${item.ingredients.join(', ')}</p>
    `
	menuWontonContainer.appendChild(button)
})

// ----------------------------dips-------------------------------

const menuDipContainer = document.querySelector('.menu-dipbtn-upper-container')
const dipPrice = document.getElementById(`dipPrice`)

dips.forEach(item => {
    const button = document.createElement('button')
    button.classList.add('menu-dip-btn')
	button.innerHTML = `${item.name}`
	dipPrice.innerHTML = `${item.price}` + " SEK"
	menuDipContainer.appendChild(button)
})

// ------------------------drinks--------------------------------
const menuDrinkContainer = document.querySelector('.menu-drinkbtn-upper-container')
const drinkPrice = document.getElementById(`drinkPrice`)

drinks.forEach(item => {
    const button = document.createElement('button')
    button.classList.add('menu-drink-btn')
	button.innerHTML = `${item.name}`
	drinkPrice.innerHTML = `${item.price}` + " SEK"
	menuDrinkContainer.appendChild(button)
})