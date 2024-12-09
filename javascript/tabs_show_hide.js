//----------- Variables declaration-------------

const menuCartButton = document.querySelector(`.menu-cartBTN`)
const orderCartButton = document.querySelector(`.order-cartBTN `)
const payButton = document.querySelector(`.paymentBtn`)
const receiptButton = document.querySelector(`.eta-receipt`)
const newOrderButton = document.querySelector(`.eta-new-orderBtn`)
const receiptNewOrderButton = document.querySelector(`.receipt-new-orderBtn`)
const menuTab = document.querySelector(`.menu`)
const orderTab = document.querySelector(`.order`)
const wontonBoxTab = document.querySelector(`.eta`)
const receiptTab = document.querySelector(`.receipt`)


// ---------------show or hide TABs---------------

menuCartButton.addEventListener("click", () => {
	menuTab.classList.add(`hidden`)
	orderTab.classList.remove(`hidden`)
})

//--------what's a function of the cartBTN in orderTAB?-----
// menuCartButton.addEventListener("click", () => {
// 	menuTab.classList.add(`hidden`)                 
// 	orderTab.classList.remove(`hidden`)
// })

payButton.addEventListener("click", () => {
	orderTab.classList.add(`hidden`)
	wontonBoxTab.classList.remove(`hidden`)
})
receiptButton.addEventListener("click", () => {
	wontonBoxTab.classList.add(`hidden`)
	receiptTab.classList.remove(`hidden`)
})
newOrderButton.addEventListener("click", () => {
	wontonBoxTab.classList.add(`hidden`)
	menuTab.classList.remove(`hidden`)
})
receiptNewOrderButton.addEventListener("click", () => {
	receiptTab.classList.add(`hidden`)
	menuTab.classList.remove(`hidden`)
})