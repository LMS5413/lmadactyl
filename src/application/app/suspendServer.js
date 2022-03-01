const axios = require('axios')
/**
 * @typedef {Object} SuspendServer
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {boolean} suspend
 * @returns {SuspendServer}
 */
async function suspendServer(panelUrl, apiKey, serverId, suspend=true) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string or is not URL"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if (typeof suspend !== "boolean") return Promise.reject(new Error("Signal is not a boolean"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'POST',
                url: urlFormed + '/api/client/servers/' + serverId + `${suspend ? '/suspend' : '/unsuspend'}`,
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            })
            return res(response.status)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            if(e.response?.status === 404) return res(Promise.reject(new Error("Server ID is not valid")))
            if(e.response?.status === 422) return res(Promise.reject(new Error("Signal is not valid")))
            res(Promise.reject({message: "An error occurred while trying to suspend/unsuspend server! " + e.message}))
        }
    })
}
module.exports = suspendServer