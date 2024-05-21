const express = require('express')
const urlRoute = require('./routes/url')
const {connectMongoDb} = require('./connect')
const URL =  require('./models/url')


const app = express()
const PORT = 8001

connectMongoDb("mongodb://localhost:27017/short-url")

app.use(express.json()) // for parsing application/json

app.use("/url",urlRoute)

app.use("/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },{
        $push : {visitHistory: {timestamp: Date.now()}}
    })
    res.redirect(entry.redirectUrl )
})

app.listen(PORT, () => {console.log(`Server Started at PORT: ${PORT}`);})