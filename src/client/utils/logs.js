const axios = require('axios')
const ws = require('ws')
/**
 * @typedef {Array} LogsConsole
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} serverId
 * @returns {LogsConsole}
 */
async function logs(panelUrl, apiKey, serverId, color=false, timeout=1000) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string or is not URL"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if (typeof serverId !== "string") return Promise.reject(new Error("Server ID is not a string"))
    return new Promise(async res => {
        try {
            const response2 = await axios({
                method: 'GET',
                url: urlFormed + '/api/client/servers/' + serverId + '/websocket',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json',
                    "Content-Type": "application/json",
                }
            })
            let consoleFormed = []
            const request = new ws(response2.data.data.socket, {origin: urlFormed});
            request.on('open', async (reason) => {
                request.send(JSON.stringify({"event": "auth", "args": [response2.data.data.token]}))
            })
            request.on('message', (msg) => {
                let result = JSON.parse(Buffer.from(msg, 'base64').toString())
                request.send(JSON.stringify({"event": "send logs", "args": [null]}))
                if(result.event !== "console output") return;
                if(result.args[0].length === 0) return;
                if(consoleFormed.some(x => result.args[0].includes(x))) return;
                consoleFormed.push(color ? result.args[0].replace(">", ""):result.args[0].replace(">", "").replaceAll(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
            })
            request.on('close', () => {
                return res(consoleFormed)
            })
            request.on('error', () => {
                return res(204)
            })
            setTimeout(() => {
                request.close()
            }, timeout)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            if(e.response?.status === 404) return res(Promise.reject(new Error("Server ID is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to send command! " + e.message)))
        }
    })
}
module.exports = logs