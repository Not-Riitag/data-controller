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
     * Check the users' credentials against a certain permission level.
     * @param {User} user 
     * @param {Permissions} permission 
     * @returns {Boolean}
     */
    hasPermission (permission) {
        return this.permissions & permission === permission
    }
}

module.exports = User
