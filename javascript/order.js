
import { wontons, dips, drinks } from './api_data.js'

const orderContainer = document.querySelector('.order')
const orderItemContainer = orderContainer.querySelector('.order-item')
const orderPriceElement = orderContainer.querySelector('.order-price')

let cart = [] // Creating list to store products

// Creating a function to render the order tab
function renderOrderTab() {
    orderItemContainer.innerHTML = ''

    let totalPrice = 0

    cart.forEach((item, index) => {
        const itemSubtotal = item.price * item.quantity
        totalPrice = totalPrice + itemSubtotal

        const orderItem = document.createElement('div')
        orderItem.classList.add('order-item-container')
        orderItem.innerHTML = `
            <div class="order-item-name-container">
                <p class="order-item-name">${item.name}</p>
                <span class="order-item-dots"></span>
                <p class="order-item-subtotal">${itemSubtotal} SEK</p>
            </div>
            <div class="order-btn-container">
                <button class="order-plusBtn" data-index="${index}">+</button>
                <span class="order-item-quantity">${item.quantity} stycken</span>
                <button class="order-minusBtn" data-index="${index}">&#8211;</button>
            </div>
        `

        orderItemContainer.appendChild(orderItem)
    })

    orderPriceElement.textContent = `${totalPrice} SEK`
}

// adding item to cart or update quantity
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)

    if (existingItem) {
        existingItem.quantity++
    } else {
        cart.push({ ...item, quantity: 1 })
    }

    renderOrderTab()
}

// incrreasing or decreasing number of items with +- buttons
orderItemContainer.addEventListener('click', (event) => {
    const button = event.target

    if (button.classList.contains('order-plusBtn')) {
        const index = parseInt(button.dataset.index)
        cart[index].quantity++
    } else if (button.classList.contains('order-minusBtn')) {
        const index = parseInt(button.dataset.index)
        cart[index].quantity--

        if (cart[index].quantity === 0) {
            cart.splice(index, 1) // removing item if amount is 0
        }
    }

    renderOrderTab()
})


const menuButtons = document.querySelectorAll('.menu-item-btn')
menuButtons.forEach((button, index) => {
    button.addEventListener('click', () => addToCart(wontons[index]))
})

const dipButtons = document.querySelectorAll('.menu-dip-btn')
dipButtons.forEach((button, index) => {
    button.addEventListener('click', () => addToCart(dips[index]))
})

const drinkButtons = document.querySelectorAll('.menu-drink-btn')
drinkButtons.forEach((button, index) => {
    button.addEventListener('click', () => addToCart(drinks[index]))
})

export { addToCart }
