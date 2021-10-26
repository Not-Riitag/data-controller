const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')

if (!fs.existsSync('config.json'))
    fs.writeFileSync('config.json', JSON.stringify({uri: 'mongodb://localhost:27017/'}))

const client = new MongoClient(JSON.parse(String(fs.readFileSync('config.json'))).uri)

client.connect()

class UserManager {

    static async getAdminUser () {
      const database = client.db('not-riitag');
      const users = database.collection('users');
      const user = await users.findOne({})
      return user;
    }
}

module.exports = UserManager;