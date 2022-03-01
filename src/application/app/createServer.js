const axios = require('axios')
/**
 * @typedef {Object} CreateServer
 * @property {string} object - The object
 * @property {string} attributes - The atrributes
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} object
 * @returns {CreateServer}
 */
async function createServer(panelUrl, apiKey,object) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if(typeof object !== "object") return Promise.reject("Object is not a object")
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'POST',
                url: urlFormed + '/api/application/servers',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                },
                data: object
            })
            return res(response.data)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to create server! " + e.response?.data ? JSON.stringify(e.response.data.errors): e.message)))
        }
    })
}
module.exports = createServer