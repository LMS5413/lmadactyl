const axios = require('axios')
/**
 * @typedef {Object} CreateServer
 * @property {string} object - The object
 * @property {object} attributes - The atrributes
 * @property {string} attributes.id - ID from server
 * @property {string} attributes.external_id - External id from server
 * @property {string} attributes.uuid - UUID from server
 * @property {string} attributes.name - Name from server
 * @property {string} attributes.identifier - Identifier from server
 * @property {string} attributes.description - Description from server
 * @property {boolean} attributes.suspended - Checks whether the server is suspended or not
 * @property {string} attributes.limits - Limits from server
 * @property {Number} attributes.limits.memory - Memory from server
 * @property {Number} attributes.limits.disk - Disk from server
 * @property {Number} attributes.limits.cpu - CPU from server
 * @property {Number} attributes.limits.io - IO from server
 * @property {Number} attributes.limits.swap - Swap from server
 * @property {Number} attributes.limits.theards - Threads from server
 * @property {string} attributes.feature_limits
 * @property {Number} attributes.feature_limits.databases - Databases from server
 * @property {Number} attributes.feature_limits.allocations - Allocations from server
 * @property {Number} attributes.feature_limits.backups - Backups from server
 * @property {Number} attributes.user - Owner ID from server
 * @property {Number} attributes.node - Node ID from server
 * @property {Number} attributes.allocation - Allocation ID from server
 * @property {Number} attributes.nest - Nest ID from server
 * @property {Number} attributes.egg - Egg ID from server
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