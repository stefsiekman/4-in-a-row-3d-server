// List of errors by code
const errors = [
    "Database connection error",
    "Functionality not supported",
    "Invalid AI name"
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
