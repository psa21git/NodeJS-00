const User = require('../models/user')
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../services/auth')

async function handleUserSignUp(req,res){
    const {name,email,password} = req.body
    await User.create({
        name:name,
        email:email,
        password:password
    })
    return res.render("login")
}
async function handleUserLogin(req,res){
    const {email,password} = req.body
    const user = await User.findOne({email,password})
    if(!user) return res.redirect("/login")
    const sessionId = uuidv4();
    setUser(sessionId,user)
    res.cookie("uid",sessionId)
    return res.redirect('/')
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}
