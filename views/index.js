const fs = require("fs")
const express = require("express")
const router = express.Router()
module.exports = router

// CSS files
router.use("/css/", express.static("./views/css"))

// Navigation links
const navLinks = [
    { name: "Home", url: "/" },
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

// Games
router.get("/games", (req, res) => {
    res.render("pages/games", {
        links: navLinks,
        active: "/games"
    })
})
