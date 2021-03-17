//Imports 
const express = require('express');
const UserController = require('../Controller/UserController');
const router = express.Router();
const { authenticateToken } = require('../Core/Jwt');
const { upload } = require('../Core/fileUploader')

// ? routes
router.post('/', UserController.add_a_user);
router.post('/Profile', upload.single('profileImage'), authenticateToken, UserController.addProfileToUser);
router.post("/login", UserController.login)
router.post("/updateProfile", authenticateToken, UserController.UpdateProfile)
router.post("/deleteUser", authenticateToken, UserController.DeleteUser)
router.post("/addFriend", authenticateToken, UserController.addFriend)
router.post("/deleteFriend", authenticateToken, UserController.deleteFriend)
router.get("/getQrCode", authenticateToken, UserController.getQrCode)
module.exports = router;