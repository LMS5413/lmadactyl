const axios = require('axios')
/**
 * @typedef {Object} ListServersAdmin
 * @property {string} object - The object
 * @property {string} data - The data
 * @property {string} data.attributes - The atrributes
 * @property {string} data.attributes.id - ID from server
 * @property {string} data.attributes.external_id - External id from server
 * @property {string} data.attributes.uuid - UUID from server
 * @property {string} data.attributes.name - Name from server
 * @property {string} data.attributes.identifier - Identifier from server
 * @property {string} data.attributes.description - Description from server
 * @property {boolean} data.attributes.suspended - Checks whether the server is suspended or not
 * @property {string} data.attributes.limits - Limits from server
 * @property {Number} data.attributes.limits.memory - Memory from server
 * @property {Number} data.attributes.limits.disk - Disk from server
 * @property {Number} data.attributes.limits.cpu - CPU from server
 * @property {Number} data.attributes.limits.io - IO from server
 * @property {Number} data.attributes.limits.swap - Swap from server
 * @property {Number} data.attributes.limits.theards - Threads from server
 * @property {string} data.attributes.feature_limits
 * @property {Number} data.attributes.feature_limits.databases - Databases from server
 * @property {Number} data.attributes.feature_limits.allocations - Allocations from server
 * @property {Number} data.attributes.feature_limits.backups - Backups from server
 * @property {Number} data.attributes.user - Owner ID from server
 * @property {Number} data.attributes.node - Node ID from server
 * @property {Number} data.attributes.allocation - Allocation ID from server
 * @property {Number} data.attributes.nest - Nest ID from server
 * @property {Number} data.attributes.egg - Egg ID from server
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
            if(e.response && (e.response.status === 401 || e.response.status === 403)) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to list servers! " + e.message)))
        }
    })
}
module.exports = listServers