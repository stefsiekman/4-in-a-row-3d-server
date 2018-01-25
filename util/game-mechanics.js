module.exports = {

    // Function to check whether a move at a certain position is possible
    possibleMove: (moves, position) => {
        var count = 0

        // Check if there are already 4 balls at the position
        for (move of moves) {
            if (move.position == position) {
                count++
            }
        }

        return count < 4
    }

}
