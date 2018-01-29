$(() => {

    "use strict"

    $.getJSON("/game", (data) => {
        data.forEach(addGame)
    })

    function addGame(game) {
        var $col = $("<div>").addClass("col-sm-4 col-md-3")
        var $game = $("<a>").addClass("thumbnail").html(game.id)


        $("#games-list").append($col.append($game))
    }

})
