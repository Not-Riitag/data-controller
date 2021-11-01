const UserManager = require("../UserManager")
const User = require("./User")

class Tag {

    /**
     * @type {User}
     */
    user = undefined

    coins = 0

    overlay = 1

    background = "default"

    coinImage = "default"

    lastPlayed = null

    flags = 1

    constructor (data, convert=true) {
        Object.assign(this, data, convert ? { user: UserManager.get(data.user) } : {})
    }
}

module.exports = Tag
