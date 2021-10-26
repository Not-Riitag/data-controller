const { getConnection } = require('./Connection')
const crypto = require('crypto')

class SessionManager {
    static async getSession(token) {
        const database = getConnection().db('not-riitag');
        const sessions = database.collection('sessions');
        const session = await sessions.findOne({ token })

        return session
    }

    static async findSession(user) {
        const database = getConnection().db('not-riitag');
        const sessions = database.collection('sessions');
        const session = await sessions.findOne({ user })

        if (session == null) return null

        return session
    }

    static async createSession(user) {
        const database = getConnection().db('not-riitag');
        const sessions = database.collection('sessions');
        const session = {
            user,
            token: crypto.randomBytes(32).toString('hex'),
            createdAt: new Date()
        }

        await sessions.insertOne(session)

        return session    
    }
}

module.exports = SessionManager;
