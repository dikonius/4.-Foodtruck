import { cart } from './order.js'
import { renderOrderTab } from './order.js'
import { initializeBadgeUpdate } from './notification_badge.js'


const menuCartButton = document.querySelector(`.menu-cartBTN`)
const orderCartButton = document.querySelector(`.order-cartBTN `)
const payButton = document.querySelector(`.paymentBtn`)
const receiptButton = document.querySelector(`.eta-receiptBtn`)
const newOrderButton = document.querySelector(`.eta-new-orderBtn`)
const receiptNewOrderButton = document.querySelector(`.receipt-new-orderBtn`)
const menuTab = document.querySelector(`.menu`)
const orderTab = document.querySelector(`.order`)
const wontonBoxTab = document.querySelector(`.eta`)
const receiptTab = document.querySelector(`.receipt`)
const bodyElement = document.querySelector(`body`)


menuCartButton.addEventListener("click", () => {
	menuTab.classList.add(`hidden`)
	orderTab.classList.remove(`hidden`)
	bodyElement.style.backgroundColor = "var(--order-bg-color)"
})

orderCartButton.addEventListener("click", () => {
	menuTab.classList.remove(`hidden`)                 
	orderTab.classList.add(`hidden`)
	bodyElement.style.backgroundColor = "#489078"
})

payButton.addEventListener("click", () => {
	orderTab.classList.add(`hidden`)
	wontonBoxTab.classList.remove(`hidden`)
	bodyElement.style.backgroundColor = "var(--gray-bg-color)"
})
receiptButton.addEventListener("click", () => {
	wontonBoxTab.classList.add(`hidden`)
	receiptTab.classList.remove(`hidden`)
})

receiptNewOrderButton.addEventListener("click", () => {
	receiptTab.classList.add(`hidden`)
	menuTab.classList.remove(`hidden`)
	bodyElement.style.backgroundColor = "#489078"
})

// event listener to clear cart and reset the UI
newOrderButton.addEventListener("click", () => {
   cart.length = 0 

    // re-render order tab to reflect empty cart and updating the badge
    renderOrderTab()
	initializeBadgeUpdate()
    wontonBoxTab.classList.add('hidden')
    menuTab.classList.remove('hidden')
    bodyElement.style.backgroundColor = "#489078"
})
//same for the receipt "newOrderButton"
receiptNewOrderButton.addEventListener("click", () => {
    cart.length = 0
    renderOrderTab()
	initializeBadgeUpdate()
    
    wontonBoxTab.classList.add('hidden')
    menuTab.classList.remove('hidden')
    bodyElement.style.backgroundColor = "#489078"
})