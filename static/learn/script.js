$(() => {

    "use strict"

    // DOM ready

    var aiId, aiKey, game

    pushAlert("Hi there, welcome to the FIAR3D learning tool!")

    // Function to display alerts
    function pushAlert(message, type = "info") {
        var $alert = $("<div>").addClass(`alert alert-${type}`)

        if (message.error_code && message.error_message) {
            $alert.html(`<b>Error #${message.error_code}:</b> ${message.error_message}`)
        } else {
            $alert.html(message)
        }

        // Display the alert
        $alert.hide()
        $("#alerts").prepend($alert)
        $alert.slideDown()

        if (type == "info") {
            setTimeout(() => {
                $alert.slideUp(() => $alert.remove())
            }, 6666)
        }

        // Log to the terminal
        switch (type) {
        case "warning":
            console.warn(message)
            break
        case "danger":
            console.error(message)
            break
        default:
            console.log(message)
        }
    }

    function updateGameInfo(game) {
        $("#gameId").html(`${game.id}`)
        $("#gameAIa").html(`${game.ai_a}`)
        $("#gameAIb").html(`${game.ai_b}`)
        $("#gameStatus").html(`${game.status}`)
        $("#gameWinner").html(`${game.winner}`)
        $("#gameGaveup").html(`${game.gaveup}`)
        $("#gameStarted").html(`${game.started}`)

        updateBoardInfo(game.board)
    }

    function updateGameStatus() {
        var data = {
            ai_id: aiId,
            ai_key: aiKey
        }

        $.ajax({
            type: "GET",
            url: "/game/" + game.id,
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            timeout: 1000,
            success: (data) => {
                pushAlert("Game information updated")

                // Save game information
                game = data

                updateGameInfo(data)
            },
            error: (error) => {
                if (error.responseText) {
                    pushAlert(JSON.parse(error.responseText), "danger")
                } else {
                    pushAlert("Could not complete your request.", "danger")
                }
            }
        })
    }

    function startGameUpdateInterval() {
        setInterval(updateGameStatus, 2500)
    }

    // Function generate the game board
    function generateGameBoard() {
        // Four tables, for each Z position
        for (var z = 0; z < 4; z++) {
            var $column = $("<div>").addClass("col-sm-3")
            var $table = $("<table>").addClass("table table-bordered text-center")
            var $tableBody = $("<tbody>")

            // Add header row
            var $tableHead = $("<thead>").append($("<tr>").append($("<th>").attr("colspan","4").html(`Z = ${z}`)))

            // Add table rows (Y-axis)
            for (var y = 3; y >= 0; y--) {
                var $row = $("<tr>")

                // Add cells (X-axis)
                for (var x = 0; x < 4; x++) {
                    var $cell = $("<td>").addClass(`board-cell-${x}${y}${z}`)
                    $cell.html("&nbsp;")
                    $row.append($cell)
                }

                $tableBody.append($row)
            }

            $table.append($tableHead)
            $table.append($tableBody)
            $column.append($table)
            $("#board").append($column)
        }
    }
    generateGameBoard()

    // Update the board to a state
    function updateBoardInfo(board) {
        if (!board) {
            return
        }

        for (var x = 0; x < 4; x++) {
            for (var y = 0; y < 4; y++) {
                for (var z = 0; z < 4; z++) {
                    var status = board[x + y * 4][z]
                    var $cell = $(`.board-cell-${x}${y}${z}`)

                    if (status == aiId) {
                        $cell.addClass("success")
                    } else if (status) {
                        $cell.addClass("danger")
                    }
                }
            }
        }
    }

    // Hide some elements at the start
    $("#ai-credentials").hide()
    $("#join-game").hide()
    $("#game-status").hide()
    $("#board").hide()

    // AI registration
    $("#formRegister").submit((event) => {
        event.preventDefault()

        var data = {
            name: $("#aiName").val()
        }

        $.ajax({
            type: "POST",
            url: "/ai",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            timeout: 1000,
            success: (data) => {
                pushAlert("Registerd successfully!", "success")
                $("#aiName").val("")

                // Fill the ai credentials
                $("#aiCredId").val(data.id)
                $("#aiCredName").val(data.name)
                $("#aiCredKey").val(data.key)

                // Switch visibility of elements
                $("#ai-activate").hide()
                $("#ai-credentials").show()
                $("#join-game").show()

                // Save the credentials
                aiId = data.id
                aiKey = data.key
            },
            error: (error) => {
                if (error.responseText) {
                    pushAlert(JSON.parse(error.responseText), "danger")
                } else {
                    pushAlert("Could not complete your request.", "danger")
                }
            }
        })
    })

    // AI Login form
    $("#formLogin").submit((event) => {
        event.preventDefault()

        aiId = $("#aiId").val()
        aiKey = $("#aiKey").val()

        $.ajax({
            type: "GET",
            url: "/ai/" + aiId,
            timeout: 1000,
            success: (data) => {
                pushAlert("AI name loaded successfully", "success")

                // Fill the ai credentials
                $("#aiCredId").val(aiId)
                $("#aiCredName").val(data.name)
                $("#aiCredKey").val(aiKey)

                // Switch visibility of elements
                $("#ai-activate").hide()
                $("#ai-credentials").show()
                $("#join-game").show()
            },
            error: (error) => {
                if (error.responseText) {
                    pushAlert(JSON.parse(error.responseText), "danger")
                } else {
                    pushAlert("Could not complete your request.", "danger")
                }
            }
        })
    })

    // Starting a new game
    $("#new-game").click((event) => {
        event.preventDefault()

        var data = {
            ai_id: aiId,
            ai_key: aiKey
        }

        $.ajax({
            type: "POST",
            url: "/game",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            timeout: 1000,
            success: (data) => {
                pushAlert("Game created", "success")

                // Save game information
                game = data

                updateGameInfo(data)

                // Switch visibility
                $("#join-game").hide()
                $("#game-status").show()
                $("#board").show()

                startGameUpdateInterval()
            },
            error: (error) => {
                if (error.responseText) {
                    pushAlert(JSON.parse(error.responseText), "danger")
                } else {
                    pushAlert("Could not complete your request.", "danger")
                }
            }
        })
    })

    // Continuing existing game
    $("#formContinueGame").submit((event) => {
        event.preventDefault()

        game = { id: $("#conGameId").val() }

        updateGameStatus()

        // Switch visibility
        $("#join-game").hide()
        $("#game-status").show()
        $("#board").show()

        startGameUpdateInterval()
    })

})
