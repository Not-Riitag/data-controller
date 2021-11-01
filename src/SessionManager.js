const { getCollection } = require('./Connection')
const crypto = require('crypto');
const Database = require('./Enum/Database');
const User = require('./Structs/User');
const Session = require('./Structs/Session');

class SessionManager {
    /**
     * Parse the supplied authorization header and return the associated session.
     * @param {String} string header 
     * @returns {Session}
     */
    static async ParseAuthorization (string) {
        switch (string.split(' ')[0]) {
            case 'Bearer':
                return await SessionManager.get({ token: string.split(' ')[1] })
            default:
                return null
        }
    }

    /**
     * Get a session by the provided data filters.
     * @param {Session} filter 
     * @async
     * @returns {Session}
     */
    static async get (filter) {
        return new Session(await getCollection(Database.SESSIONS).findOne(filter))
    }

    /**
     * Remove a session by the user ID.
     * @param {String} user 
     */
    static async remove (user) {
        await getCollection(Database.SESSIONS).deleteOne({ user: user.id })
    }

    /**
     * Find a session for the provided user, if it doesn't exist, create one.
     * @param {User} user
     * @async
     * @returns {Session}
     */
    static async find (user) {
        const session =　await this.get({ user: user.id })
        if (session == null) return await SessionManager.create(user)

        return new Session(session)
    }

    /**
     * Create a new session for the provided user.
     * @param {User} user
     * @async 
     * @returns {Session}
     */
    static async create (user) {
        const session = {
            user: user.id,
            token: crypto.randomBytes(32).toString('hex'),
            createdAt: new Date()
        }

        await getCollection(Database.SESSIONS).insertOne(session)
        return new Session(session)    
    }
}

module.exports = SessionManager;
