import { updateBadge } from './notification_badge.js';

const orderContainer = document.querySelector('.order');
const orderItemContainer = orderContainer.querySelector('.order-item');
const orderPriceElement = orderContainer.querySelector('.order-price');

let cart = [];

function renderOrderTab() {
    orderItemContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        if (!item || !item.name || typeof item.price !== 'number') {
            console.warn('Skipping invalid cart item:', item);
            return;
        }

        const itemSubtotal = item.price * item.quantity;
        totalPrice += itemSubtotal;

        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item-container');
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
        `;
        orderItemContainer.appendChild(orderItem);
    });

    orderPriceElement.textContent = isNaN(totalPrice) ? '0 SEK' : `${totalPrice} SEK`;
}

function addToCart(item) {
    if (!item || !item.id || !item.name || typeof item.price !== 'number') {
        console.error('Invalid item attempted to be added to the cart:', item);
        return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    console.log('Cart updated:', cart); // Debug log

    renderOrderTab(); // Ensure this updates the DOM once
    updateBadge(); // Trigger badge update explicitly
}


function removeItem(index) {
    if (cart[index]) {
        cart[index].quantity--;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        renderOrderTab();
        updateBadge();
    }
}

orderItemContainer.addEventListener('click', (event) => {
    const button = event.target;

    if (button.classList.contains('order-plusBtn')) {
        const index = parseInt(button.dataset.index, 10);
        cart[index].quantity++;
        renderOrderTab();
        updateBadge();
    } else if (button.classList.contains('order-minusBtn')) {
        const index = parseInt(button.dataset.index, 10);
        removeItem(index);
    }
});

function attachMenuEventListeners(menuData) {
    menuData.forEach((item) => {
        const button = document.querySelector(`[data-id="${item.id}"]`);
        if (button) {
            // Remove any existing listeners
            const existingListener = button.dataset.listenerAttached === "true";
            if (!existingListener) {
                button.addEventListener('click', () => addToCart(item));
                button.dataset.listenerAttached = "true"; // Mark as attached
            }
        } else {
            console.warn('No button found for item:', item);
        }
    });
}


export { addToCart, attachMenuEventListeners, cart };
