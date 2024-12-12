const apiUrl = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com'
const apiKey = 'yum-PxtRFopRoKZwir25'
const tenant = "suae"


// buttonApiKey.addEventListener('click', async () => {
// 	const options = {
// 		method: 'POST'
// 	}
// 	const response = await fetch(apiUrl + '/keys', options)
// 	const data = await response.json()
// 	console.log('API-nyckel data:', data)
// })


// buttonTenant.addEventListener('click', async  () => {
// 	const options = {
// 		method: 'POST',
// 		body: JSON.stringify({ name: 'Dmytro Koniushenko' }),
// 		headers: {
// 			"Content-Type": 'application/json',
// 			"x-zocom": apiKey
// 		}	
// 	}
// 	const response = await fetch(apiUrl + '/tenants', options)
// 	const data = await response.json()
// 	console.log('Tenant: ', data)
// })

// buttonMenu.addEventListener('click', async () => {
// 	const options = {
// 		headers: {
// 			"x-zocom": apiKey
// 		}
// 	}
// 	const response = await fetch(apiUrl + '/menu', options)
// 	const data = await response.json()
// 	return data
// })


async function fetchMenu() {
    try {
        const options = {
            headers: {
                "x-zocom": apiKey
            }
        };
        const response = await fetch(apiUrl + "/menu", options)

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('API data fetched:', data)
        return data.items;
    } catch (error) {
        console.error('fetching the menu unsuccessful:', error)
    }
}

import { renderMenu } from './menu.js'
import { addToCart } from './order.js'

async function main() {
    try {
        const menuData = await fetchMenu()
        renderMenu(menuData)
    } catch (error) {
        console.error('Error during menu fetch or render:', error)
    }
}

// function which fetches and renders MENU
main()

addToCart()
