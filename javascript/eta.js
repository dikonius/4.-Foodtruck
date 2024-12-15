// import { cart } from './order.js'; // Import the cart
// import { apiUrl, apiKey, tenant } from './api_data.js'; // Import API details
// // Attach the event listener
// document.querySelector('.paymentBtn').addEventListener('click', postOrder);

// async function postOrder() {
//     if (cart.length === 0) {
//         alert("Your cart is empty! Add items before proceeding.");
//         return;
//     }

//     try {
//         const items = cart.flatMap(item => Array(item.quantity).fill(item.id));
//         const orderPayload = { items };

//         console.log("Order Payload Sent:", orderPayload);

//         const options = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-zocom": apiKey
//             },
//             body: JSON.stringify(orderPayload),
//         };

//         const response = await fetch(`${apiUrl}/${tenant}/orders`, options);
//         const responseBody = await response.json();

//         console.log("API Response Received:", responseBody);

//         if (!response.ok) {
//             throw new Error(`Failed to place order. Status: ${response.status} - ${responseBody.message || 'Unknown Error'}`);
//         }

//         displayETA(responseBody); // Display order details
//     } catch (error) {
//         console.error("Error posting the order:", error);
//         alert("There was an error placing your order. Please try again.");
//     }
// }

// function displayETA(orderData) {
//     console.log("Order Data Received:", orderData); // Debug API response

//     const etaTab = document.querySelector('.eta');
//     const etaETA = etaTab.querySelector('.eta-eta');
//     const etaOrderNumber = etaTab.querySelector('.eta-order-number');

//     if (!etaETA || !etaOrderNumber) {
//         console.error("ETA elements not found in DOM.");
//         return;
//     }

//     // Access the nested 'order' object
//     const order = orderData.order || {};
//     const etaTime = order.eta ? new Date(order.eta) : null;

//     let remainingMinutes = "ETA Unavailable";
//     if (etaTime) {
//         const now = new Date();
//         const differenceInMs = etaTime - now;
//         const differenceInMinutes = Math.ceil(differenceInMs / (1000 * 60));
//         remainingMinutes = differenceInMinutes > 0 ? `${differenceInMinutes} MIN` : "Arriving now";
//     }

//     const orderNumber = order.id || "Order Number Unavailable";

//     console.log("Remaining Minutes:", remainingMinutes);
//     console.log("Order Number:", orderNumber);

//     // Update the DOM elements
//     etaETA.textContent = `ETA ${remainingMinutes}`;
//     etaOrderNumber.textContent = `#${orderNumber}`;

//     document.querySelector('.order').classList.add('hidden');
//     etaTab.classList.remove('hidden');
// }

import { cart, renderOrderTab } from './order.js'; // Import cart and render function
import { apiUrl, apiKey, tenant } from './api_data.js'; // API details

const receiptButton = document.querySelector('.eta-receiptBtn'); // Receipt button
const newOrderButton = document.querySelector('.eta-new-orderBtn'); // New order button
const etaTab = document.querySelector('.eta'); // ETA tab
const receiptTab = document.querySelector('.receipt'); // Receipt tab
const menuTab = document.querySelector('.menu'); // Menu tab
const bodyElement = document.querySelector('body'); // For background color

let currentOrderData = null; // Store API response globally

// Function to post the order
async function postOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before proceeding.");
        return;
    }

    try {
        // Prepare the order payload
        const items = cart.flatMap(item => Array(item.quantity).fill(item.id));
        const orderPayload = { items };

        console.log("Order Payload Sent:", orderPayload);

        // Make the API request
        const response = await fetch(`${apiUrl}/${tenant}/orders`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey
            },
            body: JSON.stringify(orderPayload),
        });

        const responseBody = await response.json();

        console.log("API Response Received:", responseBody);

        if (!response.ok) {
            throw new Error(`Failed to place order. Status: ${response.status} - ${responseBody.message || 'Unknown Error'}`);
        }

        // Store the response globally
        currentOrderData = responseBody;

        // Display ETA screen
        displayETA(responseBody);
    } catch (error) {
        console.error("Error posting the order:", error);
        alert("There was an error placing your order. Please try again.");
    }
}

// Function to display ETA screen
function displayETA(orderData) {
    console.log("Order Data Received:", orderData);

    const etaETA = document.querySelector('.eta-eta');
    const etaOrderNumber = document.querySelector('.eta-order-number');

    const order = orderData.order || {};
    const etaTime = order.eta ? new Date(order.eta) : null;

    let remainingMinutes = "ETA Unavailable";
    if (etaTime) {
        const now = new Date();
        const differenceInMs = etaTime - now;
        const differenceInMinutes = Math.ceil(differenceInMs / (1000 * 60));
        remainingMinutes = differenceInMinutes > 0 ? `${differenceInMinutes} minutes` : "Arriving now";
    }

    etaETA.textContent = `ETA: ${remainingMinutes}`;
    etaOrderNumber.textContent = `Order Number: ${order.id || "Order Number Unavailable"}`;

    // Switch to ETA tab
    document.querySelector('.order').classList.add('hidden');
    etaTab.classList.remove('hidden');
}

function displayReceipt(orderData) {
    console.log("Displaying receipt with data:", orderData);

    const order = orderData.order || {};
    const items = order.items || [];
    const totalValue = order.orderValue || 0;

    const receiptOrderNumber = document.querySelector('.receipt-order-number');
    const receiptItemContainer = document.querySelector('.receipt-container');
    const receiptTotal = document.querySelector('.receipt-price');

    receiptOrderNumber.textContent = `Order Number: ${order.id || "Unavailable"}`;
    receiptTotal.textContent = `${totalValue} SEK`;

    // Clear previous items
    receiptItemContainer.innerHTML = '';

    // Group items by id and calculate total quantity and price
    const groupedItems = groupItems(items);

    // Add grouped items to the receipt
    groupedItems.forEach(item => {
        const subtotal = item.price * item.quantity;

        const itemRow = document.createElement('div');
        itemRow.classList.add('receipt-item');
        itemRow.innerHTML = `
            <div class="receipt-item-name-container">
                <p class="receipt-item-name">${item.name}</p>
                <span class="receipt-item-dots"></span>
                <p class="receipt-item-subtotal">${subtotal} SEK</p>
            </div>
            <div class="receipt-btn-container">
                <span class="receipt-item-quantity">${item.quantity} stycken</span>
            </div>
        `;
        receiptItemContainer.appendChild(itemRow);
    });

    // Switch to Receipt tab
    document.querySelector('.eta').classList.add('hidden');
    document.querySelector('.receipt').classList.remove('hidden');
}

// Function to group items by id and calculate total quantities
function groupItems(items) {
    const grouped = {};

    items.forEach(item => {
        if (!grouped[item.id]) {
            grouped[item.id] = { ...item, quantity: 1 };
        } else {
            grouped[item.id].quantity += 1;
        }
    });

    return Object.values(grouped);
}


// Function to calculate quantities from the original payload
function calculateQuantities(items) {
    const quantities = {};
    items.forEach(id => {
        if (quantities[id]) {
            quantities[id]++;
        } else {
            quantities[id] = 1;
        }
    });
    return quantities;
}


// Function to start a new order
function startNewOrder() {
    cart.length = 0; // Clear cart
    renderOrderTab(); // Re-render empty order tab

    // Switch to Menu tab
    receiptTab.classList.add('hidden');
    etaTab.classList.add('hidden');
    menuTab.classList.remove('hidden');
    bodyElement.style.backgroundColor = "#489078";
}

// Event listeners
document.querySelector('.paymentBtn').addEventListener('click', postOrder);
receiptButton.addEventListener('click', () => {
    if (currentOrderData) {
        displayReceipt(currentOrderData);
    } else {
        console.error("No order data available to display receipt.");
    }
});
newOrderButton.addEventListener('click', startNewOrder);
