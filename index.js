const express = require("express")
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

app.use("/ai", require("./routes/ai/main"))

app.get("/", (req, res) => {
    res.json({ message: "Hello, world!" })
})

app.listen(PORT, () => console.log(`Server running on ${ PORT }`))
