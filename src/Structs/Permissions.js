const Permission = require("../Enum/EnumPermissions")

class Permissions {

    /**
     * A bit representation of the permissions.
     * @type {number}
     */
    permissions = 0

    constructor (bit) {
        this.permissions = bit
    }

    /**
     * Add a new permission bit to the user.
     * @param {Permission} permission
     */
    add (permission) {
        this.permissions == this.permissions | permission
    }

    /**
     * Remove a permission bit from the user.
     * @param {Permission} permission 
     */
    remove (permission) {
        this.permissions = this.permissions & ~permission
    }

    /**
     * Check the bit-wise permission to check if the user has the permission.
     * @param {Number} permission 
     * @returns {Boolean}
     */
    has (permission) {
        if (this.permissions & 0x2) return true
        return (this.permissions & permission) === permission
    }

}

module.exports = Permissions