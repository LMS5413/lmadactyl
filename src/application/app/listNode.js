const axios = require('axios')
 /**
 * @typedef {Object} ObjectNodeList
 * @property {string} object - The object
 * @property {Object} attributes - The atrributes
 * @property {string} attributes.object - The object
 * @property {number} attributes.id - The id of the node
 * @property {string} attributes.uuid - The uuid
 * @property {boolean} attributes.public - The node is private or public
 * @property {string} attributes.name - Name of node
 * @property {string} attributes.description - The description of node
 * @property {string} attributes.location_id - ID of the node is allocated
 * @property {string} attributes.fqdn - Domain of the node
 * @property {"http" | "https"} attributes.scheme - Protocol of the node
 * @property {boolean} attributes.behind_proxy - Whether the node is using proxy cloudflare or not
 * @property {boolean} attributes.maintenance_mode - Whether the node is maintenance mode or not
 * @property {number} attributes.memory - Memory total of the node
 * @property {number} attributes.memory_overallocate - Memory leak total of the node
 * @property {number} attributes.disk - Disk total of the node
 * @property {number} attributes.disk_overallocate - Disk leak total of the node
 * @property {number} attributes.upload_size
 * @property {number} attributes.daemon_listen - Port of the node is allocated
 * @property {number} attributes.daemon_sftp - Port of the SFTP is allocated
 * @property {number} attributes.daemon_base
 * @property {string} attributes.created_at - Date of node created
 * @property {number} attributes.updated_at - Date of the node updated
 * @property {Array<ObjectNodeList>} data - The data
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {number} id
 * @returns {Promise<ObjectNodeList>}
 */
async function listUsers(panelUrl, apiKey, id) {
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    let urlFormed = new URL(panelUrl).origin
    if (typeof apiKey !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (id && isNaN(id)) return Promise.reject(new Error("Node id is not a number"))
    return new Promise(async res => {
        try {
            const response = await axios({
                    method: 'GET',
                    url: urlFormed + '/api/application/nodes' + `${id ? `/${id}`:""}`,
                    headers: {
                        'Authorization': 'Bearer ' + apiKey,
                        'Accept': 'application/json'
                    }
                })
                return res(Object.keys(response.data).filter(x => x !== "meta").map(x => JSON.parse(`{"${x}":${JSON.stringify(response.data[x])}}`)).reduce((acc, cur) => ({...acc, ...cur})))
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to list users! " + e.message)))
        }
    })
}
module.exports = listUsers