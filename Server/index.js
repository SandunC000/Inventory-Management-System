const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const cors = require("cors")

//middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Server Up on ${port}`)
  })