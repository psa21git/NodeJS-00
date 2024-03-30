const User  = require("../models/user")

async function handleGetAllUsers(req,res){
    const allDbUsers = await User.find({})
    return res.json(allDbUsers);
}
async function handleGetUserById(req,res){
    const user = await User.findById(req.params.id)   
    if (!user) return res.status(404).send({ error: 'User not found' });
    else res.json(user)
}
async function handleUpdateUserById(req,res){
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.json({ status: "user updated"})
}
async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"user deleted"})
}

async function  handleCreateNewUser(req,res){
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title) {
        return res.status(400).json({ msg: "All fields are req..." })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    })
    console.log("result: ",result)
    return res.status(201).json({msg:"success"})
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};