const Permissions = require("../Enum/Permissions")

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
    password = undefined

    /**
     * @type {Permissions}
     */
    permissions = Permissions.USER

    /**
     * @type {Date}
     */
    created = undefined

    constructor (data) {
        Object.assign(this, data)
    }
    
    /**
     * Check the users' credentials against a certain permission level.
     * @param {User} user 
     * @param {Permissions} permission 
     * @returns {Boolean}
     */
    hasPermission (permission) {
        return this.permissions % permission === 0
    }
}

module.exports = User
