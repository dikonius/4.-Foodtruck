// const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';
// const apiKey = 'yum-PxtRFopRoKZwir25';
// const tenant = "suae";

// async function fetchMenu() {
//     try {
//         const options = {
//             headers: {
//                 "x-zocom": apiKey
//             }
//         };
//         const response = await fetch(apiUrl + "/menu", options);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log('API data fetched:', data);
//         return data.items;
//     } catch (error) {
//         console.error('fetching the menu unsuccessful:', error);
//     }
// }

// import { renderMenu } from './menu.js';
// import { addToCart } from './order.js';

// async function main() {
//     try {
//         const menuData = await fetchMenu();
//         if (!menuData || menuData.length === 0) {
//             throw new Error('Menu data is empty or invalid');
//         }

//         renderMenu(menuData);

//         menuData.forEach((item) => {
//             const button = document.querySelector(`[data-id="${item.id}"]`);
//             if (button) {
//                 button.addEventListener('click', () => {
//                     if (item) {
//                         console.log('Adding to cart:', item); // Debug log
//                         addToCart(item);
//                     } else {
//                         console.warn('Attempted to add an undefined item to cart.');
//                     }
//                 });
//             } else {
//                 console.warn(`Button not found for menu item with id: ${item.id}`);
//             }
//         });
//     } catch (error) {
//         console.error('Error during menu fetch or render:', error);
//     }
// }

// main();

import { renderMenu } from './menu.js';
import { attachMenuEventListeners } from './order.js'; // Use this for adding events

export const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';
export const apiKey = 'yum-PxtRFopRoKZwir25';
export const tenant = "suae";

async function fetchMenu() {
    try {
        const options = {
            headers: {
                "x-zocom": apiKey
            }
        };
        const response = await fetch(apiUrl + "/menu", options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API data fetched:', data);
        return data.items;
    } catch (error) {
        console.error('fetching the menu unsuccessful:', error);
    }
}

async function main() {
    try {
        const menuData = await fetchMenu();
        if (!menuData || menuData.length === 0) {
            throw new Error('Menu data is empty or invalid');
        }

        renderMenu(menuData); // Render menu items
        attachMenuEventListeners(menuData); // Attach event listeners
    } catch (error) {
        console.error('Error during menu fetch or render:', error);
    }
}

main();
