const { getCollection } = require("./Connection");
const Database = require("./Enum/Database");
const Tag = require("./Structs/Tag");
const User = require("./Structs/User");

class TagManager {

    /**
     * Get user's tag based off of the user object.
     * @param {Object} filter
     */
    static async get (filter) {
        return Object.assign({}, await getCollection(Database.TAGS).findOne(filter), await getCollection(Database.GAME_HISTORY).find(filter))
    }

    /**
     * Create a new tag entry for a user.
     * @param {User} user 
     */
    static async create (user) {
        if (TagManager.get({ user })) return null // Prevent duplicate entries

        await getCollection(Database.TAGS).insertOne(new Tag({ user: user.id }, false)) // Insert a new tag.

        return new Tag({ user: user.id }) // Return a slightly different tag with the user-object attached.
    }

}

module.exports = TagManager