const { createSession } = require('./index').SessionManager
const { createUser, getUserLogin, getUser } = require('./index').UserManager
const EnumPermissions = require ('./src/Enum/EnumPermissions')
const config = require('./config.json')

async function run () {
    /** */
    const session = await getUserLogin(config.user.user, config.user.password)
    const user = await getUser({ id: session.user })
    console.log(user)

    console.log(user.permissions.toString())
    console.log(session)
}

run()