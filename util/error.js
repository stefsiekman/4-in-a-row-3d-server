// List of errors by code
const errors = [
    "Database connection error",
    "Functionality not supported",
    "Invalid AI name",
    "Missing AI id or key",
    "Invalid AI credentials",
    "Missing game id",
    "Game in no longer in progress",
    "The provided AI does not play in this game",
    "The provided AI is not to move (other AI started)",
    "The provided AI is not to move (unsure whether other AI started)",
    "AI A has to make the first move",
    "Missing position",
    "Invalid position",
    "Impossible move (already for balls at position)",
    "Unknown AI id"
]

module.exports = {

    // Make a HTTP response with the errro message
    respondJson: (res, code) => {
        // Log to the console
        console.error(`Error #${ code }: ${ errors[code - 1] }`)

        // Create the response
        res.json(500, {
            error_code: code,
            error_message: errors[code - 1]
        })
    }

}
