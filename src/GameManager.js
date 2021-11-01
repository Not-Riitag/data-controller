const fs = require('fs')
const gameList = JSON.parse(String(fs.readFileSync('./wiidb.json')))

class GameManager {

    /**
     * Get a game by the ID.
     * @param {*} game 
     */
    static get (game) {
        return { id: game, name: gameList[game].name, cover: `https://art.gametdb.com/wii/cover/US/${game}.png` }
    }
}

module.exports = GameManager
