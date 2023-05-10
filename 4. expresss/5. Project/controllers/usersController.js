const User = require("../Model/userModel")

const getAllUsers = async (req, res) => {
    const allUsers = await User.find();
    res.status(200).json({
        status: "success",
        result: allUsers.length,
        allUsers
    })
}

const getOneUser = (req, res) => {
    res.status(200).json({
        status: "success"
    })
}

const createUser = (req, res) => {
    res.status(200).json({
        status: "success"
    })
}

const patchUser = (req, res) => {
    res.status(200).json({
        status: "success"
    })
}

const deleteUser = (req, res) => {
    res.status(200).json({
        status: "success"
    })
}



module.exports = { getAllUsers, getOneUser, createUser, patchUser, deleteUser }