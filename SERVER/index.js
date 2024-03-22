const http = require('http')
const fs = require("fs")
const url = require("url")

const express = require("express")

const app = express()

app.get('/', (req, res) => {
    res.end("Hello from Home PAGE !")
})
app.get('/about', (req, res) => {
    res.end(`Hello ${req.query.name}`)
})

app.listen(8000,()=>{console.log("Server Started -> 8000")})

function myHandler(req,res){
    if (req.url === "/favicon.ico") return res.end()
    const log = `${Date.now()} : ${req.method} ${req.url} New Request Rec. \n` 
    const myUrl =  url.parse(req.url,true);
    console.log(myUrl);
    fs.appendFile("log.txt", log , (err,data)=>{
        switch (myUrl.pathname) {
            case '/':
                res.end('Home Page!'); 
                break;
            case '/about':
                const qp = myUrl.query.myname;
                res.end(`Hello ${qp}`); 
                break;
            case '/search':
                const search = myUrl.query.search_query;
                res.end(`You searched for ${search}`); 
                break;
            case '/signup':
                if (req.method === 'GET') res.end("This is a signup form !")
                else if (req.method === "POST"){
                    // DB Query
                    res.end('Success');
                }
            default:
                res.end('404 Not Found'); 
                break;
        }
    })
    // console.log("New req rec.");
    // console.log(req.headers);
    // res.end('Hello from Server')
}

// const myServer = http.createServer(app)

// myServer.listen(8000, () => { console.log("Server Started"); })
