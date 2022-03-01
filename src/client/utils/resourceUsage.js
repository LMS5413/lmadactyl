const axios = require('axios')
/**
 * @typedef {Object} resourceServerUsage
 * @property {string} object
 * @property {string} attributes - The attributes
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} serverId
 * @returns {resourceServerUsage}
 */
async function resourceUsage(panelUrl, apiKey, serverId) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string or is not URL"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if (typeof serverId !== "string") return Promise.reject(new Error("Server ID is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/client/servers/' + serverId + '/resources',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                }
            })
            return res(response.data)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            if(e.response?.status === 404) return res(Promise.reject(new Error("Server ID is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to catch rescources! " + e.message)))
        }
    })
}
module.exports = resourceUsage