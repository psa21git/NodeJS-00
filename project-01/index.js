const express = require('express')
const fs = require('fs')
const mongoose = require('mongoose')
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

//Connection to MongoDB
mongoose
.connect("mongodb://localhost:27017/psa-mongo-1")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo ERROR : ",err));

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    jobTitle:{
        type: String
    },
    gender:{
        type:String
    }
},{timestamps:true})
//Model
const User = mongoose.model("user",userSchema)

//MiddleWare
app.use(express.urlencoded({ extended: false })); //Parse URL

app.use((req, res, next) => {
    req.userName = "psa.dev"
    next();
    // return res.json({ msg: "Hello from MiddleWare 1" })
    console.log("Hello from MiddleWare 1");
})
app.use((req, res, next) => {
    console.log("Hey from MiddleWare 2", req.userName)
    next();
})

app.use((req, res, next) => {
    fs.appendFile(
        'log.txt',
        `${Date.now()} ${req.method} ${req.path} ${req.userName}\n`,
        (err, data) => {
            next();
        })
})

//Routes
app
    .route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id)   
        // const id = Number(req.params.id);
        // const user = users.find(user => user.id === id);
        if (!user) return res.status(404).send({ error: 'User not found' });
        else res.json(user)
    })
    .patch(async (req, res) => {
        // TOOD: Update user
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.json({ status: "user updated"})
        // const updateId = Number(req.params.id)
        // users.forEach((user) => {
        //     if (user.id === updateId) {
        //         user.first_name = req.query.first_name
        //         user.last_name = req.query.last_name
        //         user.email = req.query.email
        //     }
        // })
        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //     return res.json({ status: "user updated", id: updateId })
        // })
    })
    .delete(async (req, res) => {
        // TOOD: delete user
        await User.findByIdAndDelete(req.params.id)
        return res.json({status:"user deleted"})
        // const deleteId = Number(req.params.id)
        // users.forEach((user) => {
        //     if (user.id === deleteId) users.pop(user)
        // })
        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        //     return res.json({ status: "user deleted", id: deleteId })
        // })
    })

app.post('/api/users',async (req, res) => {
    // TOOD: Create user  
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "All fields are req..." })
    }
    // users.push({ ...body, id: users.length + 1 })
    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    //     return res.status(201).json({ status: "user added", id: users.length })
    // })

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    })

    console.log("result: ",result)
    return res.status(201).json({msg:"success"})
})


app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({})
    
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

//REST API
app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({})
    res.setHeader("X-myName","PSA");// Custom Headers
    // Add X before header name for custom headers
    return res.json(allDbUsers);
})

app.listen(PORT, () => { console.log(`Server started at PORT: ${PORT}`); })