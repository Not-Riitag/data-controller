const Permissions = require("./EnumPermissions")

module.exports = {
    USER: [ 0 ],
    ADMIN: [ Permissions.ADMIN ],
    MODERATOR: [ 
        Permissions.MODERATOR,
        Permissions.EDIT_USERS,
        Permissions.EDIT_USER_TAG,
        Permissions.VIEW_USERS,
        Permissions.VIEW_DASHBOARD,
        Permissions.VIEW_DASHBOARD_STATISTICS
    ],
}