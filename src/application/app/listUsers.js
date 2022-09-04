const axios = require('axios')
/**
 * @typedef {Object} ListUsersAdmin
 * @property {string} object - The object
 * @property {Array<ObjectListUsers>} data - The data
 /**
 * @typedef {Object} ObjectListUsers
 * @property {string} object - The object
 * @property {Object} attributes - The atrributes
 * @property {string} attributes.id - The id
 * @property {string} attributes.external_id - The external id
 * @property {string} attributes.uuid - The uuid
 * @property {string} attributes.username - The username
 * @property {string} attributes.email - The email
 * @property {string} attributes.first_name - The first name
 * @property {string} attributes.last_name - The last name
 * @property {string} attributes.language - The language
 * @property {boolean} attributes.root_admin - Whether the account is admin or not
 * @property {boolean} attributes.2fa - Whether the account has 2FA or not
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @returns {Promise<ListUsersAdmin>}
 */
async function listUsers(panelUrl, apiKey) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("URL panel is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/application/users',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                }
            })
            return res(response.data)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to list users! " + e.message)))
        }
    })
}
module.exports = listUsers