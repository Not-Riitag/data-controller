const EnumPermissions = require("../Enum/EnumPermissions")
const Permission = require("../Enum/EnumPermissions")

class Permissions {

    /**
     * A bit representation of the permissions.
     * @type {number}
     */
    permissions = 0

    constructor (bitfield) {
        if (Array.isArray(bitfield))
            this.set(bitfield)
        else if (typeof bitfield === "number")
            this.permissions = bitfield
    }

    /**
     * Set the permissions bitfield.
     * @param {Array<Permission>} permissions 
     */
    set (permissions) {
        this.permissions = 0
        permissions.forEach(permission => this.add(permission))
    }

    /**
     * Add a new permission bit to the user.
     * @param {Permission|Array<Permission>} permission
     */
    add (permission) {
        if (Array.isArray(permission))
            permission.forEach(p => this.permissions = this.permissions | p);
        else 
            this.permissions == this.permissions | permission;
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
     * @param {Permission} permission 
     * @returns {Boolean}
     */
    has (permission) {
        if (this.permissions & Permission.ADMIN) return true
        return (this.permissions & permission) === permission
    }

    

    toString () {
        return Object.entries(EnumPermissions).filter(entry => this.has(entry[1])).map((entry) => entry[0])
    }

}

module.exports = Permissions