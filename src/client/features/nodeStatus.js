const axios = require('axios')
/**
 * @typedef {Object} NodeStatus
 * @property {string} node - The node name
 * @property {Boolean} online - The status node is online or not
 * @property {Boolean} maintence - The status node is in maintence or not
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @returns {Promise<Array<NodeStatus>>}
 */
async function nodeStatus(panelUrl, apiKey) {
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    let urlFormed = new URL(panelUrl).origin
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'GET',
                url: urlFormed + '/api/application/nodes',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                }
            })
            let array = []
            for (i of response.data.data) {
                try {
                    let check = await axios.get(`${i.attributes.scheme}://${i.attributes.fqdn}:${i.attributes.daemon_listen}`)
                    if (check.status === 200 || check.status === 401) {
                        array.push({node: i.attributes.name, online: true, maintence: i.attributes.maintenance_mode})
                    }
                } catch (e) {
                    if(e.message.includes("Hostname/IP does not match certificate's altnames") || e.message.includes("status code 401")) {
                        array.push({node: i.attributes.name, online: true, maintence: i.attributes.maintenance_mode})
                    } else {
                        array.push({node: i.attributes.name, online: false, maintence: i.attributes.maintenance_mode})
                    }
                }
            }
            return res(array)
        } catch (e) {
            console.log(e)
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to check status node! " + e.message)))
        }
    })
}
module.exports = nodeStatus