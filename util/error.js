// List of errors by code
const errors = [
    "Database connection error",
    "Functionality not supported",
    "Invalid AI name",
    "Missing AI id or key",
    "Invalid AI credentials",
    "Missing game id",
    "Game is not in progress",
    "The provided AI does not play in this game",
    "The provided AI is not to move (other AI started)",
    "The provided AI is not to move (unsure whether other AI started)",
    "AI A has to make the first move",
    "Missing position",
    "Invalid position",
    "Impossible move (already for balls at position)",
    "Unknown AI id",
    "Not enough user fields provided",
    "Invalid username",
    "Invalid mail address",
    "Invalid password",
    "Username is taken",
    "The user could not be found",
    "Starting a session requires a username and password",
    "Invalid user credentials provided"
]

module.exports = {

    // Make a HTTP response with the errro message
    respondJson: (res, code, err) => {
        // Log to the console
        console.error(`Error #${ code }: ${ errors[code - 1] }`)

        // Log details if provided
        if (err) {
            console.error(err)
        }

        // Create the response
        res.json(500, {
            error_code: code,
            error_message: errors[code - 1]
        })
    }

}
