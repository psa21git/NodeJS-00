const express = require('express')
const fs = require('fs')
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

//MiddleWare
app.use(express.urlencoded( { extended: false } )); //Parse URL

//Routes
app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        else res.json(user)
    })
    .patch((req, res) => {
        // TOOD: Update user
        const updateId = Number(req.params.id)
        users.forEach((user)=>{
            if(user.id === updateId){
                user.first_name = req.query.first_name
                user.last_name = req.query.last_name
                user.email = req.query.email
            }
        })
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
            return res.json({status: "user updated",id:updateId})
        })
    })
    .delete((req, res) => {
        // TOOD: delete user
        const deleteId = Number(req.params.id)
        users.forEach((user)=>{
            if(user.id === deleteId) users.pop(user)
        })
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
            return res.json({status: "user deleted",id:deleteId})
        })
    })

app.post( '/api/users', ( req, res )=>{
    // TOOD: Create user
    const body = req.body
    users.push({...body,id: users.length+1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err,data) => {
        return res.json({status: "user added",id:users.length})
    })
})


app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
})

//REST API
app.get('/api/users', (req, res) => {
    return res.json(users);
})



app.listen(PORT, () => { console.log(`Server started at PORT: ${PORT}`); })