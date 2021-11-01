const UserManager = require('../UserManager');
const User = require ('./User')

class Session {
    /**
     * @type {User}
     */
    user = undefined

    /**
     * @type {string}
     */
    token = undefined

    /**
     * @type {Date}
     */
    createdAt = undefined

    constructor(data) {
        Object.assign(this, data, UserManager.get({ id: data.user.id }))
    }
}

module.exports = Session
