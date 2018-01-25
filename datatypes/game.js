// Class for the Game datatype
class Game {

    constructor(id, status, ai_a, ai_b, started) {
        this.id = id
        this.status = status
        this.ai_a = ai_a
        this.ai_b = ai_b
        this.started = started
    }

}

module.exports = {

    // Export the class
    Game: Game,

    // Method for extracting a list of Game instances from database rows
    gamesFromRows: (rows) => {
        // Clear empty array
        var games = []

        // Fill the array with AIs
        for (row of rows) {
            games.push(new Game(row.id, row.status, row.ai_a, row.ai_b,
                row.started))
        }

        // Return as list of instances
        return games
    }

}
