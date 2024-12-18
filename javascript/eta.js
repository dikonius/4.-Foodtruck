import { receiptButton } from './tabs_show_hide.js'
import { cart } from './order.js'
import { apiUrl, apiKey, tenant } from './api_data.js'
import { setCurrentOrderData, getCurrentOrderData } from './state.js'


// Function to post the order
async function postOrder() {

    try {
        // Prepare the order payload
        const items = cart.flatMap(item => Array(item.quantity).fill(item.id))
        const orderPayload = { items }

        console.log("Order Payload Sent:", orderPayload)

        //API request
        const response = await fetch(`${apiUrl}/${tenant}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey
            },
            body: JSON.stringify(orderPayload),
        })

        const responseBody = await response.json()

        console.log("API Response Received:", responseBody)

        if (!response.ok) {
            throw new Error(`Failed to place order. Status: ${response.status} - ${responseBody.message || 'Unknown Error'}`)
        }

        // Update the global state
        setCurrentOrderData(responseBody)

        // Display ETA screen
        displayETA(responseBody)
    } catch (error) {
        console.error("Error posting the order:", error)
    }
}

// Function to display ETA screen
function displayETA(orderData) {
    console.log("Order Data Received:", orderData)

    const etaETA = document.querySelector('.eta-eta')
    const etaOrderNumber = document.querySelector('.eta-order-number')

    const order = orderData.order || {}
    const etaTime = order.eta ? new Date(order.eta) : null

    let remainingMinutes = "ETA Unavailable"
    if (etaTime) {
        const now = new Date()
        const differenceInMs = etaTime - now
        const differenceInMinutes = Math.ceil(differenceInMs / (1000 * 60))
        remainingMinutes = differenceInMinutes > 0 ? `${differenceInMinutes} MIN` : "Arriving now"
    }

    etaETA.textContent = `ETA ${remainingMinutes}`
    etaOrderNumber.textContent = `#${order.id.toUpperCase() || "Order Number Unavailable"}`
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

    // Clear previous items
    receiptItemContainer.innerHTML = ''

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

// Function to group items by id and calculate total quantities
export function groupItems(items) {
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


// Function to calculate quantities from the original payload
function calculateQuantities(items) {
    const quantities = {}
    items.forEach(id => {
        if (quantities[id]) {
            quantities[id]++
        } else {
            quantities[id] = 1
        }
    })
    return quantities
}


// Event listeners postorder
document.querySelector('.paymentBtn').addEventListener('click', postOrder)
receiptButton.addEventListener('click', () => {
    const currentOrderData = getCurrentOrderData()
	if (currentOrderData) {
		displayReceipt(currentOrderData)
    } 
	else {
        console.error("No order data available to display receipt.")
    }
})