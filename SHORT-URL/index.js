const express = require('express')
const urlRoute = require('./routes/url')
const {connectMongoDb} = require('./connect')

const app = express()
const PORT = 8001

connectMongoDb("mongodb://localhost:27017/short-url")

app.use(express.json()) // for parsing application/json

app.use("/url",urlRoute)

app.listen(PORT, () => {console.log(`Server Started at PORT: ${PORT}`);})