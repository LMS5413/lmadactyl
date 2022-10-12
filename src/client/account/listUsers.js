const axios = require('axios')
/**
 * @typedef {Object} ListUsers
 * @property {string} object - The object
 * @property {Array<ObjectListUsers>} data - The data
 /** 
 * @typedef {Object} ObjectListUsers
 * @property {Object} attributes - The atrributes
 * @property {string} attributes.uuid - The uuid
 * @property {string} attributes.username - The username
 * @property {string} attributes.email - The email
 * @property {string} attributes.image- The image
 * @property {Array} attributes.permissions - The permissions
 * @property {boolean} attributes.2fa_enabled - Whether the account has 2FA or not
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} serverId
 * @returns {Promise<Array<ListUsers>>}
 */
async function listUsers(panelUrl, apiKey, serverId) {
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    let urlFormed = new URL(panelUrl).origin
    if (typeof apiKey !== "string") return Promise.reject(new Error("URL panel is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/client/servers/' + serverId + '/users',
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
module.exports = listUsers