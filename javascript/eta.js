// import { cart } from './order.js'; // Access the current cart
// import { apiUrl, apiKey, tenant } from './api_data.js'; // Use API details

// async function postOrder() {
//     if (cart.length === 0) {
//         alert("Your cart is empty! Add items before proceeding.");
//         return;
//     }

//     try {
//         // Create the order payload in the format of [1, 1, 2, 1, 5, 9]
//         const items = cart.flatMap(item => Array(item.quantity).fill(item.id));

//         const orderPayload = { items };

//         console.log("Order Payload Sent:", orderPayload); // Debug log

//         // Set up API request options
//         const options = {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-zocom": apiKey
//             },
//             body: JSON.stringify(orderPayload),
//         };

//         // Make the API call
//         const response = await fetch(`${apiUrl}/${tenant}/orders`, options);

//         const responseBody = await response.json(); // Parse the response
//         console.log("API Response Received:", responseBody); // Debug log

//         if (!response.ok) {
//             throw new Error(`Failed to place order. Status: ${response.status} - ${responseBody.message || 'Unknown Error'}`);
//         }

//         displayETA(responseBody); // Pass the response to update the ETA tab

//     } catch (error) {
//         console.error("Error posting the order:", error);
//         alert("There was an error placing your order. Please try again.");
//     }
// }




// function displayETA(orderData) {
//     // Find and populate the ETA tab elements
//     const etaTab = document.querySelector('.eta');
//     const etaPreparation = etaTab.querySelector('.eta-preparation');
//     const etaETA = etaTab.querySelector('.eta-eta');
//     const etaOrderNumber = etaTab.querySelector('.eta-order-number');

//     // Update the ETA tab with order details
//     etaPreparation.textContent = `DINA WONTONS TILLAGAS!`;
//     etaETA.textContent = `ETA: ${orderData.estimated_time} min`;
//     etaOrderNumber.textContent = `Order Number: ${orderData.order_number}`;

//     // Show the ETA tab
//     document.querySelector('.order').classList.add('hidden');
//     etaTab.classList.remove('hidden');
// }

// // Add event listener to the payment button
// document.querySelector('.paymentBtn').addEventListener('click', postOrder);

async function postOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before proceeding.");
        return;
    }

    try {
        // Create the order payload in the format of [1, 1, 2, 1, 5, 9]
        const items = cart.flatMap(item => Array(item.quantity).fill(item.id));

        const orderPayload = { items };

        console.log("Order Payload Sent:", orderPayload); // Debug log

        // Set up API request options
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-zocom": apiKey
            },
            body: JSON.stringify(orderPayload),
        };

        // Make the API call
        const response = await fetch(`${apiUrl}/${tenant}/orders`, options);

        const responseBody = await response.json(); // Parse the response
        console.log("API Response Received:", responseBody); // Debug log

        if (!response.ok) {
            throw new Error(`Failed to place order. Status: ${response.status} - ${responseBody.message || 'Unknown Error'}`);
        }

        displayETA(responseBody); // Pass the response to update the ETA tab

    } catch (error) {
        console.error("Error posting the order:", error);
        alert("There was an error placing your order. Please try again.");
    }
}

function displayETA(orderData) {
    console.log("Order Data Received:", orderData); // Debug API response

    // Find and populate the ETA tab elements
    const etaTab = document.querySelector('.eta');
    const etaPreparation = etaTab.querySelector('.eta-preparation');
    const etaETA = etaTab.querySelector('.eta-eta');
    const etaOrderNumber = etaTab.querySelector('.eta-order-number');

    if (!etaETA || !etaOrderNumber) {
        console.error("ETA elements not found in DOM.");
        return;
    }

    // Extract fields from the API response
    const eta = orderData.eta ? new Date(orderData.eta) : null;
    const formattedETA = eta
        ? `${eta.getHours()}:${String(eta.getMinutes()).padStart(2, '0')} on ${eta.toLocaleDateString()}`
        : "Unavailable";
    const orderNumber = orderData.id || "Unavailable";

    // Log formatted values
    console.log("Formatted ETA:", formattedETA);
    console.log("Order Number:", orderNumber);

    // Update the ETA tab with order details
    etaPreparation.textContent = `DINA WONTONS TILLAGAS!`;
    etaETA.textContent = `ETA: ${formattedETA}`;
    etaOrderNumber.textContent = `Order Number: ${orderNumber}`;

    // Show the ETA tab
    document.querySelector('.order').classList.add('hidden');
    etaTab.classList.remove('hidden');
}
