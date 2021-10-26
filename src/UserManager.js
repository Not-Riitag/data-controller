const { getConnection } = require('./Connection');
const {UniqueID} = require('nodejs-snowflake')
const crypto = require('crypto');
const { createSession } = require('./SessionManager');

class UserManager {

    static async createUser (data) {
        const database = getConnection().db('not-riitag');
        const users = database.collection('users');
        const user = await users.insertOne({
            id: new UniqueID({}).getUniqueID(),
            username: data.username,
            email: data.email,
            password: crypto.scryptSync(data.password, data.username, 64).toString('hex')
        })

        return user
    }

    static async getUserLogin (username, password) {
        const database = getConnection().db('not-riitag');
        const users = database.collection('users');
        const user = await users.findOne({ username })
        if (user && crypto.scryptSync(password, user.username, 64).toString('hex') === user.password) {
            return createSession(user.id);
        }
        return null;
    }

    static async getAdminUser () {
      const database = getConnection().db('not-riitag');
      const users = database.collection('users');
      const user = await users.findOne({})
      
      return user;
    }

    static async getUser (id, filters={}) {
      const database = getConnection().db('not-riitag');
      const users = database.collection('users');
      const user = await users.findOne({ id }, {projection: filters})
        
      return user;    
    }

}

module.exports = UserManager;