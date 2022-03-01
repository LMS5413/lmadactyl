const axios = require('axios')
/**
 * @typedef {Object} AccountDetail
 * @property {string} panelUrl- The panel URL
 * @property {string} apiKey - The API key
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @returns {AccountDetail}
 */
async function accountDetail(panelUrl, apiKey) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string or is not URL"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/client/account',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                }
            })
            return res(response.data)
        } catch (e) {
            if(e.response && e.response.status === 401) return Promise.reject(new Error("API key is not valid"))
            Promise.reject(new Error("An error occurred while trying catch account details! " + e.message))
        }
    })
}
module.exports = accountDetail