const express = require("express")
const PORT = process.env.PORT || 5000

const app = express()

// Host static files
for (let tool of [ "jquery", "bootstrap" ]) {
    var url = `/lib/${ tool }`
    var uri = `./node_modules/${ tool }/dist`
    app.use(url, express.static(uri))
    console.log("Hosting library static at", url, "from", uri)

}

// Host learning page
app.use("/learn/", express.static("./static/learn"))

// Host static pages with EJS
app.set("view engine", "ejs")
app.use("/", require("./views/index.js"))

// API routes
app.use(express.json())
app.use("/api/ai", require("./routes/ai/router"))
app.use("/api/game", require("./routes/game/router"))

app.listen(PORT, () => console.log(`Server running on ${ PORT }`))
