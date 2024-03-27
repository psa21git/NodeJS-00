const express = require('express')
const fs = require('fs')
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

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
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).send({ error: 'User not found' });
        else res.json(user)
    })
    .patch((req, res) => {
        // TOOD: Update user
        const updateId = Number(req.params.id)
        users.forEach((user) => {
            if (user.id === updateId) {
                user.first_name = req.query.first_name
                user.last_name = req.query.last_name
                user.email = req.query.email
            }
        })
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "user updated", id: updateId })
        })
    })
    .delete((req, res) => {
        // TOOD: delete user
        const deleteId = Number(req.params.id)
        users.forEach((user) => {
            if (user.id === deleteId) users.pop(user)
        })
        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
            return res.json({ status: "user deleted", id: deleteId })
        })
    })

app.post('/api/users', (req, res) => {
    // TOOD: Create user  
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "All fields are req..." })
    }
    users.push({ ...body, id: users.length + 1 })
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.status(201).json({ status: "user added", id: users.length })
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
    res.setHeader("X-myName","PSA");// Custom Headers
    // Add X before header name for custom headers
    return res.json(users);
})

app.listen(PORT, () => { console.log(`Server started at PORT: ${PORT}`); })