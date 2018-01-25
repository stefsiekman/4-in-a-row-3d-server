// Class for the Move datatype
class Move {

    constructor(id, ai, position, started, completed) {
        this.id = id
        this.ai = ai
        this.position = position
        this.started = started
        this.completed = completed
    }

}

module.exports = {

    // Export the class
    Move: Move,

    // Method for extracting a list of Move instances from database rows
    movesFromRows: (rows) => {
        // Clear empty array
        var moves = []

        // Fill the array with AIs
        for (row of rows) {
            moves.push(new Move(row.id, row.ai, row.position, row.started,
                    row.completed))
        }

        // Return as list of instances
        return moves
    }

}
