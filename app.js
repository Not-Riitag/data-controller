const { createSession } = require('./index').SessionManager
const { getUserLogin } = require('./index').UserManager
const config = require('./config.json')

async function run () {
    const session = await getUserLogin(config.username, config.password)
    
    console.log(session)
}

run()