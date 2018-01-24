const express = require("express")
const PORT = process.env.PORT || 5000

const app = express()

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" })
})

app.get("/ai", (req, res) => {
    res.json({ error_message: "No AIs configured yet" })
})

app.listen(PORT, () => console.log(`Server running on ${ PORT }`))
