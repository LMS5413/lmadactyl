const axios = require('axios')
/**
 * @typedef {Object} EmailUpdate
 */
/**
 * @param {string} email
 * @returns {Promise<EmailUpdate>}
 */
async function updateEmail(panelUrl, apiKey, email) {
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string or is not URL"))
    let urlFormed = new URL(panelUrl).origin
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if (typeof newPassword !== "string" || typeof currentPassword !== "string") return Promise.reject(new Error("Email is not a string"))
    return new Promise(async res => {
        try {
            const response = await axios({
                method: 'PUT',
                url: urlFormed + '/api/client/account/email',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                },
                data: {
                    "email": email,
                  }
            })
            return res(response.status)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying update email! " + e.response?.data ? e.response.data.errors: e.message)))
        }
    })
}
module.exports = updateEmail