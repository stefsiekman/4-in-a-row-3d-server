// Class for the AI datatype
class AI {

    constructor(id, name) {
        this.id = id
        this.name = name
    }

}

module.exports = {

    // Export the class
    AI: AI,

    // Method for extracting a list of AI instances from database rows
    aisFromRows: (rows) => {
        // Clear empty array
        var ais = []

        // Fill the array with AIs
        for (row of rows) {
            ais.push(new AI(row.id, row.name))
        }

        // Return as list of instances
        return ais
    }

}
