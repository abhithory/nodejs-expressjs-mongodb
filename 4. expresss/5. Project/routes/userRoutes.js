const express = require('express');
const { getAllUsers, createUser, getOneUser, patchUser, deleteUser } = require('../controllers/usersController');
const router = express.Router(); 




router
    .route("/")
    .get(getAllUsers)
    .post(createUser)

router
    .route("/:id")
    .get(getOneUser)
    .patch(patchUser)
    .delete(deleteUser)


    module.exports = router