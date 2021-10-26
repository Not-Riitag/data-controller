const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false')

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