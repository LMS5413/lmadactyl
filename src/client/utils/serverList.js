const axios = require('axios')
/**
 * @typedef {Object} ServerList
 * @property {string} object- The object
 * @property {Array<ObjectServerList>} data - The data object
 /** 
 * @typedef {Object} ObjectServerList
 * @property {string} object - The object in data
 * @property {Object} attributes - The atrributes
 * @property {string} attributes.uuid - UUID from server
 * @property {string} attributes.name - Name from server
 * @property {string} attributes.node - Node name from server
 * @property {string} attributes.sftp_details - Description from server
 * @property {string} attributes.sftp_details.ip - Host from SFTP
 * @property {string} attributes.sftp_details.port - Port from SFTP
 * @property {boolean} attributes.is_suspended - Checks whether the server is suspended or not
 * @property {string} attributes.feature_limits
 * @property {Number} attributes.feature_limits.databases - Databases from server
 * @property {Number} attributes.feature_limits.allocations - Allocations from server
 * @property {Number} attributes.feature_limits.backups - Backups from server
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @returns {ServerList}
 */
async function serverList(panelUrl, apiKey) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("URL panel is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/client',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                }
            })
            return res(response.data)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to list servers! " + e.message)))
        }
    })
}
module.exports = serverList