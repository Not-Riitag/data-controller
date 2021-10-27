const Permissions = require("../Enum/Permissions")

class User {
    id = '0'

    username = undefined

    email = undefined

    password = undefined

    permissions = Permissions.USER

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
