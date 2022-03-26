const axios = require('axios')
const { passwordStrength } = require('check-password-strength')
/**
 * @typedef {Object} CreateUser
 * @property {string} object - The object
 * @property {object} attributes - The atrributes
 * @property {string} attributes.id - The id
 * @property {string} attributes.external_id - The external id
 * @property {string} attributes.uuid - The uuid
 * @property {string} attributes.username - The username
 * @property {string} attributes.email - The email
 * @property {string} attributes.first_name - The first name
 * @property {string} attributes.last_name - The last name
 * @property {string} attributes.language - The language
 * @property {boolean} attributes.root_admin - Whether the account is admin or not
 * @property {boolean} attributes.2fa - Whether the account has 2FA or not
 * 
 */
/**
 * @param {string} panelUrl
 * @param {string} apiKey
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @param {string} name
 * @param {string} last_name
 * @returns {CreateUser}
 */
async function createUser(panelUrl, apiKey, email, password, username, name, last_name) {
    let urlFormed = new URL(panelUrl).origin
    if (typeof panelUrl !== "string") return Promise.reject(new Error("URL panel is not a string"))
    if (typeof apiKey !== "string") return Promise.reject(new Error("API key is not a string"))
    if (typeof email !== "string") return Promise.reject(new Error("Email is not a string"))
    if (typeof password !== "string") return Promise.reject(new Error("Password is not a string"))
    if (typeof username !== "string" || typeof name !== "string" || typeof last_name !== "string") return Promise.reject(new Error(
        `Username/name/lastname is not a string \n \n ${typeof username !== "string" ? "Username: Not string" : "Username: Is String"} \n ${typeof name !== "string" ? "Name: Not string" : "Name: Is String"} \n ${typeof last_name !== "string" ? "Last name: Not string" : "Last name: Is String"}`))
    return new Promise(async res => {
        let passwordStrengthResult = passwordStrength(password).value
        try {
            if (passwordStrengthResult !== "medium" && passwordStrengthResult !== "strong") console.log("WARN! Password is not secure enough")
            const response = await axios({
                method: 'POST',
                url: urlFormed + '/api/application/users',
                headers: {
                    'Authorization': 'Bearer ' + apiKey,
                    'Accept': 'application/json'
                },
                data: {
                    "email": email,
                    "password": password,
                    "username": username,
                    "first_name": name,
                    "last_name": last_name
                }
            })
            return res(response.data)
        } catch (e) {
            if (e.response && e.response.status === 401) return res(Promise.reject(new Error("API key is not valid")))
            res(Promise.reject(new Error("An error occurred while trying to create user! " + e.response?.data ? JSON.stringify(e.response.data.errors) : e.message)))
        }
    })
}
module.exports = createUser