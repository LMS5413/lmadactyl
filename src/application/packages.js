let { readdirSync } = require('fs')
let filesClient = readdirSync(__dirname).filter(x => !x.endsWith('.js'))
var object = new Array()
for (let file of filesClient) {
    for (let file2 of readdirSync(__dirname + "/" + file)) {
        let func = require(`./${file}/${file2}`)
        object.push({ [file2.split('.')[0]]: func, category: file })
    }
}
const arrumado = (object) => Object.keys({...object}).map(x => object[x])
const ARRAY = arrumado(object)

const CATEGORIES = [...new Set(ARRAY.map(e => e.category))]

module.exports = Object.fromEntries([
    ...CATEGORIES.map(c => {
        const filtered = ARRAY.filter(e => e.category === c).map(c => {
            const [key, value] = Object.entries(c)[0]

            return {
                [key]: value
            }
        })

        return [
            c,
            filtered.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        ]
    })
])