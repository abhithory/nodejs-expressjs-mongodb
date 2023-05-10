const express = require('express');
const { getAllUsers, createUser, getOneUser, patchUser, deleteUser } = require('../controllers/usersController');
const { signup } = require('../controllers/authController');
const router = express.Router();



router.post("/signup", signup);

router
    .route("/")
    .get(getAllUsers)
// .post(createUser)

// router
//     .route("/:id")
//     .get(getOneUser)
//     .patch(patchUser)
//     .delete(deleteUser)


module.exports = router