const { createSession } = require('./index').SessionManager
const { getUserLogin } = require('./index').UserManager

async function run () {
    const session = await getUserLogin('Matthe815', 'Killerfi1')
    
    console.log(session)
}

run()