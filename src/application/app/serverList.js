const axios = require('axios')
/**
 * @typedef {Object} ListServersAdmin
 * @property {string} object - The object
 * @property {string} data - The data
 * @property {string} data.attributes - The atrributes
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @returns {ListServersAdmin}
 */
async function listServers(panelUrl, apiKey) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("URL panel is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/application/servers',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                }
            })
            return res(response.data)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject({message: "API key is not valid"}))
            res(Promise.reject({message: "An error occurred while trying to list servers! " + e.message}))
        }
    })
}
module.exports = listServers