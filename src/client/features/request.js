const axios = require('axios')
/**
 * @typedef {Object} Request
 */
/**
 * @param {string} endpoint
 * @param {string} header
 * @param {string} body
 * @param {"get" | "patch" | "post" | "delete" | "put"} method
 * @returns {Promise<Request>}
 */
async function request(endpoint, header, method, body=null) {
    let methods = ["get", "patch", "post", "delete", "put"]
    if(!methods.some(x => method.toLowerCase().includes(x))) return Promise.reject(new Error("Method is not valid, Methods valid: " + methods.join(", ").toUpperCase()))
    if (typeof endpoint !== "string") return Promise.reject(new Error("Endpoint is not a string"))
    if (typeof header !== "object") return Promise.reject(new Error("Header is not a object"))
    if (typeof method !== "string") return Promise.reject(new Error("Method is not a object"))
    if(body && typeof body !== "object") return Promise.reject(new Error("Body is not a object"))
    return new Promise(async res => {
        try {
            let object = {
                method: method.toUpperCase(),
                url: endpoint,
                headers: header,
                data: body
            }
            if(method.toLowerCase() !== "get") {
                object.data = body
            } else {
                delete object.data
            }
            const response = await axios(object)
            return res(response.data)
        } catch (e) {
            res(Promise.reject(new Error("An error occurred while trying to request api! " + e.response?.data ? JSON.stringify(e.response.data.errors): e.message)))
        }
    })
}
module.exports = request