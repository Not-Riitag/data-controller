const { getConnection } = require('./Connection');
const {UniqueID} = require('nodejs-snowflake')
const crypto = require('crypto');
const { createSession } = require('./SessionManager');
const Permissions = require('./Enum/Permissions');

class UserManager {

    static async createUser (data) {
        const database = getConnection().db('not-riitag');
        const users = database.collection('users');
        const user = await users.insertOne({
            id: new UniqueID({}).getUniqueID(),
            username: data.username,
            email: data.email,
            password: crypto.scryptSync(data.password, data.username, 64).toString('hex'),
            permissions: Permissions.USER
        })

        return user
    }

    static async hasPermission (user, permission) {
        return user.permissions % permission
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

    /**
     * Search the user database by a provided search type and filter.
     * @param {Object} search 
     * @param {*} filters 
     * @returns 
     */
    static async getUser (search, filters={}) {
      const database = getConnection().db('not-riitag');
      const users = database.collection('users');
      const user = await users.findOne(search, {projection: filters})
        
      return user;    
    }

}

module.exports = UserManager;