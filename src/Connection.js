const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')

if (!fs.existsSync('config.json'))
    fs.writeFileSync('config.json', JSON.stringify({uri: 'mongodb://localhost:27017/'}))

const client = new MongoClient(JSON.parse(String(fs.readFileSync('config.json'))).uri)
client.connect()

class Connection {
    static getConnection() {
        return client
    }

    static close() {
        client.close()
    }

    static getCollection(collection) {
        return client.db('not-riitag').collection(collection)
    }
}

module.exports = Connection
