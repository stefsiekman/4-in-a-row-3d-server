module.exports = {

    validAIName: (name) => {
        return name != undefined &&
                typeof name == typeof "" &&
                name.match(/^[a-z]{1}[a-z0-9-]{2,30}[a-z0-9]{1}$/)
    }

}
