import { cart } from './order.js'
import { renderOrderTab } from './order.js'
// import { showCartBtn } from './order.js'
import { initializeBadgeUpdate } from './notification_badge.js'


export const menuCartButton = document.querySelector(`.menu-cartBTN`)
const orderCartButton = document.querySelector(`.order-cartBTN `)
export const payButton = document.querySelector(`.paymentBtn`)
export const receiptButton = document.querySelector(`.eta-receiptBtn`)
const newOrderButton = document.querySelector(`.eta-new-orderBtn`)
const receiptNewOrderButton = document.querySelector(`.receipt-new-orderBtn`)
const menuTab = document.querySelector(`.menu`)
const orderTab = document.querySelector(`.order`)
export const wontonBoxTab = document.querySelector(`.eta`)
export const receiptTab = document.querySelector(`.receipt`)
const bodyElement = document.querySelector(`body`)

export function showCartBtn() {
	if (cart.length >= 1) {
		document.getElementById("menuCartBtn").style.visibility = "visible"
	}
	else {
		document.getElementById("menuCartBtn").style.visibility = "hidden"
	}
}

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

    // Ensure nested container visibility
    const receiptImgContainer = document.querySelector('.receipt-nest4-img-container')
    if (receiptImgContainer) {
        receiptImgContainer.style.display = 'flex' // or remove `hidden` class if used
    }
})

// event listener to clear cart and reset the UI
newOrderButton.addEventListener("click", () => {
   cart.length = 0 

    // re-render order tab to reflect empty cart and updating the badge
    renderOrderTab()
	initializeBadgeUpdate()
	showCartBtn()

    wontonBoxTab.classList.add('hidden')
    menuTab.classList.remove('hidden')
    bodyElement.style.backgroundColor = "#489078"
})
//same for the receipt "newOrderButton"
receiptNewOrderButton.addEventListener("click", () => {
    cart.length = 0
    renderOrderTab()
	initializeBadgeUpdate()
	showCartBtn()
    
    receiptTab.classList.add('hidden')
    menuTab.classList.remove('hidden')
    bodyElement.style.backgroundColor = "#489078"
})

