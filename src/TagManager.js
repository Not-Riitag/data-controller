const { UserManager } = require("..");
const { getCollection } = require("./Connection");
const Database = require("./Enum/Database");
const GameManager = require("./GameManager");
const Tag = require("./Structs/Tag");
const User = require("./Structs/User");

class TagManager {

    /**
     * Get user's tag based off of the user object.
     * @param {User} user
     */
    static async get (user) {
        return Object.assign({}, await getCollection(Database.TAGS).findOne({ user: user.id }, { projection: { "_id": 0 } }), 
        { user: Object.assign(user, { permissions: user.permissions.permissions }) }, 
        { games: await TagManager.resolveGameList(user.id) })
    }

    static async resolveGameList (id) {
        const games = await (await getCollection(Database.GAME_HISTORY).find({ user: id }, { projection: { user: 0, "_id": 0 } }).toArray())
        const list = []

        games.forEach(async (game) => {
            list.push(Object.assign(game, { game: await GameManager.get(game.game) }))
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
