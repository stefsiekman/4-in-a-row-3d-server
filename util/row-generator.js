// Function to get all rows on board's Z axis
function rowsZ(board) {
    // Z-axis is the standard way to save rows
    return board
}

// Function to get all rows on board's X axis
function rowsX(board) {
    var rows = []

    for (var y = 0; y < 4; y++) {
        for (var z = 0; z < 4; z++) {
            rows.push([
                board[0 + y * 4][z],
                board[1 + y * 4][z],
                board[2 + y * 4][z],
                board[3 + y * 4][z]
            ])
        }
    }

    return rows
}

// Function to get all rows on board's Y axis
function rowsY(board) {
    var rows = []

    for (var x = 0; x < 4; x++) {
        for (var z = 0; z < 4; z++) {
            rows.push([
                board[x + 0 * 4][z],
                board[x + 1 * 4][z],
                board[x + 2 * 4][z],
                board[x + 3 * 4][z]
            ])
        }
    }

    return rows
}

// Function to get all diagonal rows on XY plane
function rowsXY(board) {
    var rows = []

    for (var z = 0; z < 4; z++) {
        // From (0,0) to (x,y)
        rows.push([
            board[0 + 0 * 4][z],
            board[1 + 1 * 4][z],
            board[2 + 2 * 4][z],
            board[3 + 3 * 4][z]
        ])

        // From (0,y) to (x,0)
        rows.push([
            board[0 + 3 * 4][z],
            board[1 + 2 * 4][z],
            board[2 + 1 * 4][z],
            board[3 + 0 * 4][z]
        ])
    }

    return rows
}

// Function to get all diagonal rows on XY plane
function rowsXZ(board) {
    var rows = []

    for (var y = 0; y < 4; y++) {
        // From (0,0) to (x,z)
        rows.push([
            board[0 + y * 4][0],
            board[1 + y * 4][1],
            board[2 + y * 4][2],
            board[3 + y * 4][3]
        ])

        // From (0,z) to (x,0)
        rows.push([
            board[0 + y * 4][3],
            board[1 + y * 4][2],
            board[2 + y * 4][1],
            board[3 + y * 4][0]
        ])
    }

    return rows
}

// Function to get all diagonal rows on XY plane
function rowsYZ(board) {
    var rows = []

    for (var x = 0; x < 4; x++) {
        // From (0,0) to (y,z)
        rows.push([
            board[x + 0 * 4][0],
            board[x + 1 * 4][1],
            board[x + 2 * 4][2],
            board[x + 3 * 4][3]
        ])

        // From (0,z) to (y,0)
        rows.push([
            board[x + 0 * 4][3],
            board[x + 1 * 4][2],
            board[x + 2 * 4][1],
            board[x + 3 * 4][0]
        ])
    }

    return rows
}

// Function to get all diagonal rows on XYZ planes
function rowsXYZ(board) {
    return [
        // (0,0,0) to (x,y,z)
        [
            board[0 + 0 * 4][0],
            board[1 + 1 * 4][1],
            board[2 + 2 * 4][2],
            board[3 + 3 * 4][3]
        ],
        // (x,0,0) to (0,y,z)
        [
            board[3 + 0 * 4][0],
            board[2 + 1 * 4][1],
            board[1 + 2 * 4][2],
            board[0 + 3 * 4][3]
        ],
        // (0,y,0) to (x,0,z)
        [
            board[0 + 3 * 4][0],
            board[1 + 2 * 4][1],
            board[2 + 1 * 4][2],
            board[3 + 0 * 4][3]
        ],
        // (x,y,0) to (0,0,z)
        [
            board[3 + 3 * 4][0],
            board[2 + 2 * 4][1],
            board[1 + 1 * 4][2],
            board[0 + 0 * 4][3]
        ]
    ]
}

module.exports = (board) => {
    var rows = []

    rows = rows.concat(rowsX(board))
    rows = rows.concat(rowsY(board))
    rows = rows.concat(rowsZ(board))
    rows = rows.concat(rowsXY(board))
    rows = rows.concat(rowsXZ(board))
    rows = rows.concat(rowsYZ(board))
    rows = rows.concat(rowsXYZ(board))

    return rows
}
