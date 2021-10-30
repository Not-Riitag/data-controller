const { createUser, getUserLogin, getUser } = require('./index').UserManager
const config = require('./config.json')

async function run() {
    console.log (await createUser({
        username: config.user.user,
        password: config.user.password,
        permissions: config.user.permissions,
        email: config.user.email
    }));

    const session = await getUserLogin(config.user.user, config.user.password);
    console.log(session);
    const user = await getUser({ id: session.user });
    console.log(user);
}

run();