const express = require("express")
const PORT = process.env.PORT || 5000

const app = express()

// Host static files
for (let tool of [ "jquery", "bootstrap" ]) {
    var url = `/${ tool }`
    var uri = `./node_modules/${ tool }/dist`
    app.use(url, express.static(uri))
    console.log("Hosting library static at", url, "from", uri)

}
app.use("/", express.static("./static"))

app.use(express.json())

app.use("/ai", require("./routes/ai/router"))
app.use("/game", require("./routes/game/router"))

app.listen(PORT, () => console.log(`Server running on ${ PORT }`))
