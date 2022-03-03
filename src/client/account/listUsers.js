const axios = require('axios')
/**
 * @typedef {Object} ListUsers
 * @property {string} object - The object
 * @property {string} data - The data
 * @property {string} data.attributes - The atrributes
 * @property {string} data.attributes.uuid - The uuid
 * @property {string} data.attributes.username - The username
 * @property {string} data.attributes.email - The email
 * @property {string} data.attributes.image- The image
 * @property {Array} data.attributes.permissions - The permissions
 * @property {boolean} data.attributes.2fa_enabled - Whether the account has 2FA or not
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} serverId
 * @returns {ListUsers}
 */
async function listUsers(panelUrl, apiKey, serverId) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
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