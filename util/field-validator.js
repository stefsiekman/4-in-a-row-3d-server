const validateMail = require("email-validator").validate;

module.exports = {

    // Checks whether the provided strings (in array form) are actually strings and not empty
    requireNonEmptyStrings: (strings) => {

        for (let string of strings) {
            var error = false

            // Make sure the're of type string
            error |= typeof string !== "string"

            // Make sure the string is not empty
            error |= string === ""

            // We can immediately return in case of an error
            if (error) return false
        }

        // If we're here, the strings must be good
        return true

    },

    username: (username) => {
        return /^[a-z][a-z0-9]{3,31}$/.test(username)
    },

    mail: (mail) => {
        return validateMail(mail)
    },

    password: (password) => {
        return /.{8,}/.test(password)
    }

}
