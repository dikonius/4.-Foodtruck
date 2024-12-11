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
    console.log

    try {
        const options = {
            headers: {
                "x-zocom": apiKey
            }
        }
        const response = await fetch(apiUrl + "/menu", options)

        const data = await response.json()
        console.log('Data fetched:', data) 
        return data
    } catch (error) {
        console.error('Fetching the menu unsuccessful:', error)
    }
}

fetchMenu()

const apiData = [
    {
        "id": 1,
        "type": "wonton",
        "name": "Karlstad",
        "description": "En god friterad wonton med smaker från de värmländska skogarna.",
        "ingredients": [
            "kantarell",
            "scharlottenlök",
            "morot",
            "bladpersilja"
        ],
        "price": 9
    },
    {
        "id": 2,
        "type": "wonton",
        "name": "Bangkok",
        "description": "En god friterad wonton med smaker från Bangkoks gator.",
        "ingredients": [
            "morot",
            "salladslök",
            "chili",
            "kokos",
            "lime",
            "koriander"
        ],
        "price": 9
    },
    {
        "id": 3,
        "type": "wonton",
        "name": "Ho Chi Minh",
        "description": "En god friterad wonton med smaker från vietnams matkultur.",
        "ingredients": [
            "kål",
            "morot",
            "salladslök",
            "chili",
            "vitlök",
            "ingefära",
            "tofu"
        ],
        "price": 9
    },
    {
        "id": 4,
        "name": "Paris",
        "type": "wonton",
        "description": "En god friterad wonton med smaker från det franska köket.",
        "ingredients": [
            "kål",
            "honung",
            "chevré",
            "basilika",
            "valnötspasta"
        ],
        "price": 9
    },
    {
        "id": 5,
        "type": "wonton",
        "name": "Oaxaca",
        "description": "En god friterad wonton med smaker från mexicos kryddiga matkultur.",
        "ingredients": [
            "majs",
            "tomat",
            "rostade ärtor",
            "vitlök",
            "lime"
        ],
        "price": 9
    },
    {
        "id": 6,
        "type": "dip",
        "name": "Sweet Chili",
        "description": "Stark och söt dip från Thailänska höglandet.",
        "price": 19
    },
    {
        "id": 7,
        "type": "dip",
        "name": "Sweet n Sour",
        "description": "Klassiska sötsura dipsåsen från Kina.",
        "price": 19
    },
    {
        "id": 8,
        "type": "dip",
        "name": "Guacamole",
        "description": "Avocado, tomat och kryddor i optimal kombination.",
        "price": 19
    },
    {
        "id": 9,
        "type": "dip",
        "name": "Wonton Standard",
        "description": "Smaksatt olja med soya, chili, vitlök & ingefära.",
        "price": 19
    },
    {
        "id": 10,
        "type": "dip",
        "name": "Hot Mango",
        "description": "Kryddstark och söt chunky mangodip.",
        "price": 19
    },
    {
        "id": 11,
        "type": "dip",
        "name": "Chili Mayo",
        "description": "Egengjord majonäs smaksatt med chili.",
        "price": 19
    },
    {
        "id": 12,
        "type": "drink",
        "name": "Sprite",
        "description": "Lorem ipsum dolor sit amet, bubbly fruity elit. Fizzy carbonated.",
        "price": 19
    },
    {
        "id": 13,
        "type": "drink",
        "name": "Fanta Orange",
        "description": "Lorem ipsum dolor sit amet, bubbly fruity elit. Fizzy carbonated.",
        "price": 19
    },
    {
        "id": 14,
        "type": "drink",
        "name": "Fanta Exotic",
        "description": "Lorem ipsum dolor sit amet, bubbly fruity elit. Fizzy carbonated.",
        "price": 19
    },
    {
        "id": 15,
        "type": "drink",
        "name": "Coca Cola",
        "description": "Lorem ipsum dolor sit amet, bubbly fruity elit. Fizzy carbonated.",
        "price": 19
    },
    {
        "id": 16,
        "type": "drink",
        "name": "LOKA Citrus",
        "description": "Lorem ipsum dolor sit amet, bubbly fruity elit. Fizzy carbonated.",
        "price": 19
    },
    {
        "id": 17,
        "type": "drink",
        "name": "LOKA Granatäpple",
        "description": "Lorem ipsum dolor sit amet, bubbly fruity elit. Fizzy carbonated.",
        "price": 19
    }
]

// -----we declare groups of items from the fetched data------------

const wontons = [apiData[0], apiData[1], apiData[2], apiData[3], apiData[4]]
const dips = [apiData[5], apiData[6], apiData[7], apiData[8], apiData[9], apiData[10] ]
const drinks = [apiData[11], apiData[12], apiData[13], apiData[14], apiData[15], apiData[16] ]

export {wontons}
export {dips}
export {drinks}