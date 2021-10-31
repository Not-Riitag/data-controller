const { getCollection } = require("../Connection")
const Permissions = require("./Permissions")

class User {
    /**
     * @type {string}
     */
    id = '0'

    /**
     * @type {string}
     */
    username = undefined

    /**
     *  @type {string}
     */
    email = undefined

    /**
     * @type {string}
     */
    avatar = undefined

    /**
     * @type {string}
     */
    password = undefined

    /**
     * @type {Permissions}
     */
    permissions = undefined

    /**
     * @type {Date}
     */
    created = undefined

    constructor (data) {
        Object.assign(this, data)

        this.permissions = new Permissions(this.permissions) // Assign a permission handler.
    }

    /**
     * Update the data within a user document.
     * @param {User} data 
     */
    update (data) {
        getCollection('users').updateOne({ id: this.id }, { $set: data })
    }
}

module.exports = User
