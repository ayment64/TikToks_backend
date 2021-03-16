//Imports 
const express = require('express');
const UserController = require('../Controller/UserController');
const router = express.Router();
const { authenticateToken } = require('../Core/Jwt');


// ? routes
router.post('/', UserController.add_a_user);
router.post('/Profile',authenticateToken ,UserController.addProfileToUser);
router.post("/login", UserController.login)
router.post("/updateProfile",authenticateToken ,UserController.UpdateProfile)
router.post("/deleteUser",authenticateToken ,UserController.DeleteUser)
router.get("/getQrCode",authenticateToken ,UserController.getQrCode)
module.exports = router;