const express = require('express')
const path = require("path")
const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const {connectMongoDb} = require('./connect')
const URL =  require('./models/url')

const app = express()
const PORT = 8001

app.set('view engine', 'ejs');
app.set("views",path.resolve("./views"))

connectMongoDb("mongodb://localhost:27017/short-url")

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: false})) // for parsing form data as input

app.use("/url",urlRoute)
app.use('/',staticRoute)
  
/*
// paste this is in home for list of shortIds
 <% urls.forEach(url => { %>
<li><%= url.shortId %></li>
<% }) %> 
*/
app.get("/test",async (req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls:allUrls
    })
})

app.get("/url/:shortId",async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push : {visitHistory: {timestamp: Date.now()}}
        }
    );
    res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => {console.log(`Server Started at PORT: ${PORT}`);})