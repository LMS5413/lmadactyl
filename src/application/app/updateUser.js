const axios = require('axios')
const { passwordStrength } = require('check-password-strength')
/**
 * @typedef {Object} UpdateUser
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} userId
 * @param {Object} object
 * @returns {Promise<UpdateUser>}
 */
async function updateUser(panelUrl, apiKey, userId, object) {
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    let urlFormed = new URL(panelUrl).origin
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if(typeof userId !== "string") return Promise.reject(new Error("User id is not a string"))
    if(typeof object !== "object") return Promise.reject(new Error("Object is not an object"))
    return new Promise(async res => {
        let passwordStrengthResult = passwordStrength(object.password ?? null).value.toLowerCase()
        try {
            if(object.password) {
                if (passwordStrengthResult !== "medium" && passwordStrengthResult !== "strong") console.log("WARN! Password is not secure enough")
            }
            const response = await axios({
                method: 'PATCH',
                url: urlFormed + '/api/application/users/' + userId,
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                },
                data: object
            })
            return res(response.status)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to create server! " + e.response?.data ? JSON.stringify(e.response.data.errors): e.message)))
        }
    })
}
module.exports = updateUser