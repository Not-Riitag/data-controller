const { createSession } = require('./index').SessionManager
const { getUserLogin } = require('./index').UserManager

async function run () {
    const session = await getUserLogin('test', 'test')
    
    console.log(session)
}

run()