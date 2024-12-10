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
newOrderButton.addEventListener("click", () => {
	wontonBoxTab.classList.add(`hidden`)
	menuTab.classList.remove(`hidden`)
	bodyElement.style.backgroundColor = "#489078"
})
receiptNewOrderButton.addEventListener("click", () => {
	receiptTab.classList.add(`hidden`)
	menuTab.classList.remove(`hidden`)
	bodyElement.style.backgroundColor = "#489078"
})