const axios = require('axios')
/**
 * @typedef {Array} sendSignal
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {"start" | "kill" | "stop" | "restart"} signal
 * @returns {sendSignal}
 */
async function sendSignal(panelUrl, apiKey, serverId, signal) {
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string or is not URL"))
    let urlFormed = new URL(panelUrl).origin
    let signals = ["start", "kill", "stop", "restart"]
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if (typeof signal !== "string") return Promise.reject(new Error("Signal is not a string"))
    if (!signals.some(x => signal.toLowerCase().includes(x))) return Promise.reject(new Error("Signal is not valid. Signals valid: " + signals.join(", ")))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'POST',
                url: urlFormed + '/api/client/servers/' + serverId + '/power',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                },
                data: {
                    "signal": signal
                }
            })
            return res(response.data.status)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            if(e.response?.status === 404) return res(Promise.reject(new Error("Server ID is not valid")))
            res(Promise.reject({message: "An error occurred while trying to send signal! " + e.message}))
        }
    })
}
module.exports = sendSignal