import { renderMenu } from './menu.js'
import { attachMenuEventListeners } from './order.js'
import { showCartBtn } from './tabs_show_hide.js'


export const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'
export const apiKey = 'yum-PxtRFopRoKZwir25'
export const tenant = "suae"


async function fetchMenu() {
    try {
        const options = {
            headers: {
                "x-zocom": apiKey
            }
        };
        const response = await fetch(apiUrl + "/menu", options)

        if (!response.ok) {
            throw new Error(`http error!!! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('API data fetched:', data)
        return data.items
    } catch (error) {
        console.error('fetching the menu unsuccessful:', error)
    }
}


async function main() {
    try {
        const menuData = await fetchMenu()

        renderMenu(menuData)
        attachMenuEventListeners(menuData)
        showCartBtn(); // Update visibility of the cart button based on the initial cart state
    } catch (error) {
        console.error('Error during menu fetch or render:', error)
    }
}

main()
