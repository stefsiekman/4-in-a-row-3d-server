// List of errors by code
const errors = [
    "Database connection error"
]

module.exports = {

    // Make a HTTP response with the errro message
    respondJson: (res, code) => {
        // Log to the console
        console.error(`Errro #${ code }: ${ errors[code - 1] }`)

        // Create the response
        res.json({
            error_code: code,
            error_message: errors[code - 1]
        })
    }

}
