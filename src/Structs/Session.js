class Session {
    /**
     * @type {string}
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
        Object.assign(this, data)
    }
}

module.exports = Session
