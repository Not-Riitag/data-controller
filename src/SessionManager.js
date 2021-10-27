const { getCollection } = require('./Connection')
const crypto = require('crypto');
const Database = require('./Enum/Database');
const User = require('./Structs/User');
const Session = require('./Structs/Session');

class SessionManager {
    /**
     * Get a session by the provided token.
     * @param {String} token 
     * @async
     * @returns {Session}
     */
    static async getSession(token) {
        return await getCollection(Database.SESSIONS).findOne({ token })
    }

    /**
     * Find a session for the provided user, if it doesn't exist, create one.
     * @param {User} user
     * @async 
     * @returns {Session}
     */
    static async findSession(user) {
        const session = await getCollection(Database.SESSIONS).findOne({ user: user.id })
        if (session == null) return await SessionManager.createSession(user)

        return new Session(session)
    }

    /**
     * Create a new session for the provided user.
     * @param {User} user
     * @async 
     * @returns {Session}
     */
    static async createSession(user) {
        await getCollection(Database.SESSIONS).insertOne({
            user,
            token: crypto.randomBytes(32).toString('hex'),
            createdAt: new Date()
        })

        return new Session(session)    
    }
}

module.exports = SessionManager;
