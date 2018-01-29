const fs = require("fs")
const express = require("express")
const router = express.Router()
module.exports = router
const AI = require("../datatypes/ai").AI
const Game = require("../datatypes/game").Game

// CSS files
router.use("/css/", express.static("./views/css"))

// Navigation links
const navLinks = [
    { name: "Home", url: "/" },
    { name: "AIs", url: "/ais" },
    { name: "Games", url: "/games" },
    { name: "Documentation", url: "/documentation" }
]

// Home
router.get("/", (req, res) => {
    res.render("pages/index", {
        links: navLinks,
        active: "/"
    })
})

// Documentation
router.get("/documentation", (req, res) => {
    res.render("pages/documentation", {
        links: navLinks,
        active: "/documentation"
    })
})

// AIs
router.get("/ais", (req, res) => {
    AI.list(res, (ais) => {
        res.render("pages/ais", {
            links: navLinks,
            active: "/ais",
            ais: ais
        })
    })
})

// Games
router.get("/games", (req, res) => {
    Game.list(res, (games) => {
        res.render("pages/games", {
            links: navLinks,
            active: "/games",
            games: games
        })
    })
})
