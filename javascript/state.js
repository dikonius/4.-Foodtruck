let currentOrderData = null
let cart = []

export function setCurrentOrderData(data) {
    currentOrderData = data
}

export function getCurrentOrderData() {
    return currentOrderData
}

export function getCart() {
    return cart
}
