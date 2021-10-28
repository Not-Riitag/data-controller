const { createSession } = require('./index').SessionManager
const { createUser, getUserLogin, getUser } = require('./index').UserManager
const EnumPermissions = require ('./src/Enum/EnumPermissions')
const config = require('./config.json')

async function run () {
    /** */
    const session = await getUserLogin(config.username, config.password)
    console.log(user)

    console.log(user.permissions.has(EnumPermissions.MODERATOR))
    console.log(session)
}

run()