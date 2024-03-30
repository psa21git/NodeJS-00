const express = require('express')
const app = express();
const PORT = 8000;

const userRouter = require("./routes/user");
const { connectMongoDb } = require('./connection');
const {logReqRes} = require("./middlewares/index")

//Connection to MongoDB
connectMongoDb("mongodb://localhost:27017/psa-mongo-1");

//MiddleWare
app.use(express.urlencoded({ extended: false })); //Parse URL
app.use(logReqRes("log.txt"))

// Router
app.use('/user',userRouter)

app.listen(PORT, () => { console.log(`Server started at PORT: ${PORT}`); })