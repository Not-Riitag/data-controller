const { getCollection } = require('./Connection');
const {UniqueID} = require('nodejs-snowflake')
const crypto = require('crypto');
const SessionManager = require('./SessionManager');

const Permissions = require('./Enum/EnumPermissions');
const Database = require('./Enum/Database');
const User = require('./Structs/User');
const Session = require('./Structs/Session');
const PasswordUtils = require('./PasswordUtils');

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
        // Validate that the email and username aren't already in use.
        if (await UserManager.getUser({ $or: [{ $text: { $search: data.username, $caseSensitive: false } }, { email: data.email }] })) return { message: 'A user with that username or email already exists' } // If the username already exists, return null
        // Validate the password security.
        if (!PasswordUtils.checkPolicy(data.password).isValid) return { message: PasswordUtils.checkPolicy(data.password).message }

        const user = {
            id: new UniqueID({}).getUniqueID(),
            username: data.username,
            email: data.email,
            password: PasswordUtils.makePassword(data.password, data.username),
            permissions: data.permissions || 0,
            created: new Date()
        }

        await getCollection(Database.USERS).insertOne(user)
        return new User(user)
    }

    /**
     * Check the user credentials and return the user if they are valid.
     * @param {String} username 
     * @param {String} password
     * @async
     * @returns {Session|null}
     */
    static async getUserLogin (username, password) {
        const user = await getCollection(Database.USERS).findOne({ username })
        if (user && crypto.scryptSync(password, user.username, 64).toString('hex') === user.password) return SessionManager.find(user)
        
        return null
    }

    /**
     * Select and return the master admin user from the database.
     * @async
     * @returns {User}
     */
    static async getMasterAdminUser () {
      return await UserManager
        .getUser({ id: 0 })
    }

    /**
     * Search the user database by a provided search type and filter.
     * @param {UserProperties} search A JSON-Based object containing the search
     * @param {UserProperties} filters A JSON-based value containing the filters
     * @async
     * @returns {User}
     */
    static async getUser (search, filters={}) {     
      const user = await (getCollection(Database.USERS)).findOne(search, {projection: filters});
      return user != null ? new User(user) : null
    }

}

module.exports = UserManager;