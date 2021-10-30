class PasswordUtils {
    static checkPolicy (password) {
        if (password.length < 8) return {　isValid: false,　message: 'Password must be at least 8 characters long'　}
        if (!/[A-Z]/.test(password)) return { isValid: false, message: 'Password must contain at least one uppercase letter' }
        if (!/[a-z]/.test(password)) return { isValid: false, message: 'Password must contain at least one lowercase letter' }
        if (!/[0-9]/.test(password)) return {　isValid: false,　message: 'Password must contain at least one number' }

        return {　isValid: true　}
    }
}

module.exports = PasswordUtils