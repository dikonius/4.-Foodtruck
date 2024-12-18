import { cart } from './order.js'

export function updateBadge() {
    const badge = document.querySelector('.menu-badge')

    const totalItems = cart.reduce((count, item) => count + item.quantity, 0)

    if (totalItems > 0) {
        badge.textContent = totalItems
        badge.classList.remove('hidden')
    } else {
        badge.classList.add('hidden')
    }
}

function initializeBadgeUpdate() {
    const orderItemContainer = document.querySelector('.order-item')

    const observer = new MutationObserver(() => {
        updateBadge()
    })
    observer.observe(orderItemContainer, { childList: true, subtree: true })

    // updating badge immidiately ater initialization
    updateBadge()
}

export { initializeBadgeUpdate }
