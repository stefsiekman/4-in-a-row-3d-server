// Function to get all rows on board's Z axis
function rowsZ (board) {
  var rows = []

  for (var x = 0; x < 4; x++) {
    for (var y = 0; y < 4; y++) {
      var row = []
      for (var z = 0; z < 4; z++) {
        row.push(board[z][x][y])
      }
      rows.push(row)
    }
  }

  return rows
}

// Function to get all rows on board's X axis
function rowsX (board) {
  var rows = []

  for (var y = 0; y < 4; y++) {
    for (var z = 0; z < 4; z++) {
      var row = []
      for (var x = 0; x < 4; x++) {
        row.push(board[z][x][y])
      }
      rows.push(row)
    }
  }

  return rows
}

// Function to get all rows on board's Y axis
function rowsY (board) {
  var rows = []

  for (var x = 0; x < 4; x++) {
    for (var z = 0; z < 4; z++) {
      var row = []
      for (var y = 0; y < 4; y++) {
        row.push(board[z][x][y])
      }
      rows.push(row)
    }
  }

  return rows
}

// Function to get all diagonal rows on XY plane
function rowsXY (board) {
  var rows = []

  for (var z = 0; z < 4; z++) {
        // From (0,0) to (x,y)
    rows.push([
      board[z][0][0],
      board[z][1][1],
      board[z][2][2],
      board[z][3][3]
    ])

        // From (0,y) to (x,0)
    rows.push([
      board[z][0][3],
      board[z][1][2],
      board[z][2][1],
      board[z][3][0]
    ])
  }

  return rows
}

// Function to get all diagonal rows on XY plane
function rowsXZ (board) {
  var rows = []

  for (var y = 0; y < 4; y++) {
        // From (0,0) to (x,z)
    rows.push([
      board[0][0][y],
      board[1][1][y],
      board[2][2][y],
      board[3][3][y]
    ])

        // From (0,z) to (x,0)
    rows.push([
      board[3][0][y],
      board[2][1][y],
      board[1][2][y],
      board[0][3][y]
    ])
  }

  return rows
}

// Function to get all diagonal rows on XY plane
function rowsYZ (board) {
  var rows = []

  for (var x = 0; x < 4; x++) {
        // From (0,0) to (y,z)
    rows.push([
      board[0][x][0],
      board[1][x][1],
      board[2][x][2],
      board[3][x][3]
    ])

        // From (0,z) to (y,0)
    rows.push([
      board[3][x][0],
      board[2][x][1],
      board[1][x][2],
      board[0][x][3]
    ])
  }

  return rows
}

// Function to get all diagonal rows on XYZ planes
function rowsXYZ (board) {
  return [
        // (0,0,0) to (x,y,z)
    [
      board[0][0][0],
      board[1][1][1],
      board[2][2][2],
      board[3][3][3]
    ],
        // (x,0,0) to (0,y,z)
    [
      board[0][3][0],
      board[1][2][1],
      board[2][1][2],
      board[3][0][3]
    ],
        // (0,y,0) to (x,0,z)
    [
      board[0][0][3],
      board[1][1][2],
      board[2][2][1],
      board[3][3][0]
    ],
        // (x,y,0) to (0,0,z)
    [
      board[0][3][3],
      board[1][2][2],
      board[2][1][1],
      board[3][0][0]
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
