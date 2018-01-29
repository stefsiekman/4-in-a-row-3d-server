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

// Single AI
router.get("/ais/:aiId", (req, res) => {
    AI.getById(res, req.params.aiId, (ai) => {
        if (!ai) {
            // If the ai was not found
            res.render("pages/404")
        } else {
            // Otherwise, display the found ai
            res.render("pages/ai", {
                links: navLinks,
                active: "/ais",
                ai: ai
            })
        }
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

// 404
router.get("*", (req, res) => {
    res.render("pages/404")
})
