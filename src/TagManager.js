const { getCollection } = require("./Connection");
const Database = require("./Enum/Database");
const GameManager = require("./GameManager");
const Tag = require("./Structs/Tag");
const User = require("./Structs/User");

class TagManager {

    /**
     * Get user's tag based off of the user object.
     * @param {Object} filter
     */
    static async get (filter) {
        return Object.assign({}, await getCollection(Database.TAGS).findOne(filter), { games: await TagManager.resolveGameList(filter.user) })
    }

    static async resolveGameList (id) {
        const games = await (await getCollection(Database.GAME_HISTORY).find({ user: id }, { projection: { user: 0 } }).toArray())
        const list = []

        games.forEach(async (game) => {
            list.push(Object.assign(game, await GameManager.get({ id: game.game })))
        })

        return await list
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
