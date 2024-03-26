const express = require('express')
const users = require("./MOCK_DATA.json")
const app = express();
const PORT = 8000;

//Routes
app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        else res.json(user)
    })
    .put((req, res) => {
        // TOOD: create user
        return res.json({status: "Pending"})
    })
    .patch((req, res) => {
        // TOOD: Update user
        return res.json({status: "Pending"})
    })
    .delete((req, res) => {
        // TOOD: delete user
        return res.json({status: "Pending"})
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