const axios = require('axios')
const { passwordStrength } = require('check-password-strength')
/**
 * @typedef {Object} PasswordUpdate
 * @property {string} currentPassword - The current password
 * @property {string} newPassword - The new password
 * @property {string} panelUrl - The panel URL
 * @property {string} apiKey - The API key
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} currentPassword
 * @param {string} newPassword
 * @returns {PasswordUpdate}
 */
async function updatePassword(panelUrl, apiKey, currentPassword ,newPassword) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof newPassword !== "string" || typeof currentPassword !== "string") return Promise.reject({message: "Password is not a string"})
    if(currentPassword === newPassword) return Promise.reject({message: "New password is the same as current password"})
    let passwordStrengthResult = passwordStrength(newPassword).value
    return new Promise(async res => {
        try {
            if (passwordStrengthResult !== "medium" && passwordStrengthResult !== "strong") console.log("WARN! Password is not secure enough")
            const response = await axios({
                method: 'PUT',
                url: urlFormed + '/api/client/account/password',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                },
                data: {
                    "current_password": currentPassword,
                    "password": newPassword,
                    "password_confirmation": newPassword
                  }
            })
            return res(response.status)
        } catch (e) {
            if(e.response && e.response.status === 401) return res(Promise.reject({message: "API key is not valid"}))
            res(Promise.reject({message: "An error occurred while trying update password! " + e.response?.data ? e.response.data.errors: e.message}))
        }
    })
}
module.exports = updatePassword