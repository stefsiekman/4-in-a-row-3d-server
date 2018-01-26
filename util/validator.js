module.exports = {

    validAIName: (name) => {
        return name !== undefined &&
                typeof name == typeof "" &&
                name.match(/^[a-z]{1}[a-z0-9-]{2,30}[a-z0-9]{1}$/)
    },

    validPosition: (position) => {
        return typeof position === typeof 1 &&
                position !== NaN &&
                position !== null &&
                position !== undefined &&
                position >= 0 && position < 16
    }

}
