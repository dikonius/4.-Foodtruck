import { renderMenu } from './menu.js'
import { attachMenuEventListeners } from './order.js'


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
        if (!menuData || menuData.length === 0) {
            throw new Error('menu-data is empty or invalid')
        }

        renderMenu(menuData) // we render menu
        attachMenuEventListeners(menuData)
    } catch (error) {
        console.error('error during menu fetch or render:', error)
    }
}

main()
