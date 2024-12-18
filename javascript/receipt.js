// Clear previous items in receipt TAB
function clearReceiptItems() {
	const oldItemContainers = document.querySelectorAll('.receipt-item')
	oldItemContainers.forEach(item => {
		item.innerHTML = '' 
	})
}


export function displayReceipt(orderData) {
    console.log("Displaying receipt with data:", orderData)

    const order = orderData.order || {}
    const items = order.items || []
    const totalValue = order.orderValue || 0

    const receiptOrderNumber = document.querySelector('.receipt-order-number')
    const receiptItemContainer = document.querySelector('.receipt-container')
    const receiptTotal = document.querySelector('.receipt-price')

    receiptOrderNumber.textContent = `#${order.id.toUpperCase() || "Order Number Unavailable"}`
    receiptTotal.textContent = `${totalValue} SEK`

	
	// Clear all receipt items from previous order
	clearReceiptItems()

    // Group items by id and calculate total quantity and price
    const groupedItems = groupItems(items)

    // Add grouped items to the receipt
    groupedItems.forEach(item => {
        const subtotal = item.price * item.quantity

        const itemRow = document.createElement('div')
        itemRow.classList.add('receipt-item')
        itemRow.innerHTML = `
            <div class="receipt-item-name-container">
                <p class="receipt-item-name">${item.name}</p>
                <span class="receipt-item-dots"></span>
                <p class="receipt-item-subtotal">${subtotal} SEK</p>
            </div>
            <div class="receipt-btn-container">
                <span class="receipt-item-quantity">${item.quantity} stycken</span>
            </div>
        `
        receiptItemContainer.appendChild(itemRow)
    })

}

function groupItems(items) {
    const grouped = {}

    items.forEach(item => {
        if (!grouped[item.id]) {
            grouped[item.id] = { ...item, quantity: 1 }
        } else {
            grouped[item.id].quantity += 1
        }
    })

    return Object.values(grouped)
}