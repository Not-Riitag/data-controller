const { getCollection } = require('./Connection');
const {UniqueID} = require('nodejs-snowflake')
const crypto = require('crypto');
const { createSession } = require('./SessionManager');

const Permissions = require('./Enum/Permissions');
const Database = require('./Enum/Database');
const User = require('./Structs/User');

/**
 * @typedef {Object} UserProperties
 * @property {string} id
 * @property {string} username
 * @property {string} password
 * @property {string} email
 * @property {Number} permissions
 */
class UserManager {
    /**
     * Create a user within the database and return the new user.
     * @param {UserProperties} data Serialized form of a user structure 
     * @async
     * @returns {User|null}
     */
    static async createUser (data) {
        if (await UserManager.getUser({ username: data.username })) return null // If the username already exists, return null

        const user = await getCollection(Database.USERS).insertOne({
            id: new UniqueID({}).getUniqueID(),
            username: data.username,
            email: data.email,
            password: crypto.scryptSync(data.password, data.username, 64).toString('hex'),
            permissions: Permissions.USER
        })

        return new User(user)
    }

    /**
     * Check the user credentials and return the user if they are valid.
     * @param {String} username 
     * @param {String} password
     * @async
     * @returns {User|null}
     */
    static async getUserLogin (username, password) {
        const user = await getCollection(Database.USERS).findOne({ username })
        if (user && crypto.scryptSync(password, user.username, 64).toString('hex') === user.password) return createSession(user.id)
        
        return null
    }

    /**
     * Select and return the first admin user from the database.
     * @async
     * @returns {User}
     */
    static async getAdminUser () {
      return await UserManager
        .getUser({ permissions: Permissions.ADMIN })
    }

    /**
     * Search the user database by a provided search type and filter.
     * @param {UserProperties} search A JSON-Based object containing the search
     * @param {UserProperties} filters A JSON-based value containing the filters
     * @async
     * @returns {User}
     */
    static async getUser (search, filters={}) {        
      return new User(await getCollection(Database.USERS)
        .findOne(search, {projection: filters}));
    }

}

module.exports = UserManager;