import { cart } from './order.js'; // Import the cart
import { renderOrderTab } from './order.js'; // Import the render function
import { initializeBadgeUpdate } from './notification_badge.js'

//----------- Variables declaration-------------


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


// ---------------show or hide TABs---------------

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
// newOrderButton.addEventListener("click", () => {
// 	wontonBoxTab.classList.add(`hidden`)
// 	menuTab.classList.remove(`hidden`)
// 	bodyElement.style.backgroundColor = "#489078"
// })
receiptNewOrderButton.addEventListener("click", () => {
	receiptTab.classList.add(`hidden`)
	menuTab.classList.remove(`hidden`)
	bodyElement.style.backgroundColor = "#489078"
})
// regMenuButton.addEventListener("click", () => {
// 	menuTab.classList.remove(`hidden`)
// })

// Event listener to clear cart and reset the UI
newOrderButton.addEventListener("click", () => {
    // Clear the cart
    cart.length = 0; // Reset cart array

    // Re-render order tab to reflect empty cart
    renderOrderTab();
	initializeBadgeUpdate();
    // Switch to the menu tab
    wontonBoxTab.classList.add('hidden');
    menuTab.classList.remove('hidden');
    bodyElement.style.backgroundColor = "#489078"; // Restore menu background color
});
receiptNewOrderButton.addEventListener("click", () => {
    // Clear the cart
    cart.length = 0; // Reset cart array

    // Re-render order tab to reflect empty cart
    renderOrderTab();
	initializeBadgeUpdate();
    // Switch to the menu tab
    wontonBoxTab.classList.add('hidden');
    menuTab.classList.remove('hidden');
    bodyElement.style.backgroundColor = "#489078"; // Restore menu background color
});