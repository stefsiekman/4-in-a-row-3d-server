// List of errors by code
const errors = [
  {
    message: 'Database connection error',
    status: 500
  },
  {
    message: 'Functionality not supported',
    status: 501
  },
  {
    message: 'Invalid AI name',
    status: 400
  },
  {
    message: 'Missing AI id or key',
    status: 400
  },
  {
    message: 'Invalid AI credentials',
    status: 400
  },
  {
    message: 'Missing game id',
    status: 400
  },
  {
    message: 'Game is not in progress',
    status: 403
  },
  {
    message: 'The provided AI does not play in this game',
    status: 403
  },
  {
    message: 'The provided AI is not to move (other AI started)',
    status: 403
  },
  {
    message: 'The provided AI is not to move (unsure whether other AI started)',
    status: 403
  },
  {
    message: 'AI A has to make the first move',
    status: 403
  },
  {
    message: 'Missing position',
    status: 400
  },
  {
    message: 'Invalid position',
    status: 400
  },
  {
    message: 'Impossible move (already for balls at position)',
    status: 400
  },
  {
    message: 'Unknown AI id',
    status: 404
  },
  {
    message: 'Not enough user fields provided',
    status: 400
  },
  {
    message: 'Invalid username',
    status: 400
  },
  {
    message: 'Invalid mail address',
    status: 400
  },
  {
    message: 'Invalid password',
    status: 400
  },
  { // #20
    message: 'Username is taken',
    status: 403
  },
  {
    message: 'The user could not be found',
    status: 404
  },
  {
    message: 'Starting a session requires a username and password',
    status: 400
  },
  {
    message: 'Invalid user credentials provided',
    status: 403
  },
  {
    message: 'Invalid authorization header',
    status: 400
  },
  { // #25
    message: 'Invalid authentication type',
    status: 400
  }
]

module.exports = {

    // Make a HTTP response with the errro message
  respondJson: (res, code, err) => {
        // Log to the console
    console.error(`Error #${code}: ${errors[code - 1].message}`)

        // Log details if provided
    if (err) {
      console.error(err)
    }

        // Create the response
    res.json(errors[code - 1].status, {
      error_code: code,
      error_message: errors[code - 1].message
    })
  },

  errors: errors

}
