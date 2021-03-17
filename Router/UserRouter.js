//Imports 
const express = require('express');
const UserController = require('../Controller/UserController');
const router = express.Router();
const { authenticateToken } = require('../Core/Jwt');
const { upload } = require('../Core/fileUploader')

// * routes
// ? sign up Function takes {email, password} as params creates a user without a profile 
// ? returns JWT
router.post('/', UserController.add_a_user);
// ! MultiPart Function
// ? creates a profile for a user takes {firstName , lastName ,dateOfBirth ,isDeleted,isAdmin , fileName} plus user from jwt
// ? uploads image to uploads folder and pust name in req.body.imageName*
// ? isDeleted is false by default
// ? isAdmin is false by default  
// ? returns JWT
router.post('/Profile', upload.single('profileImage'), authenticateToken, UserController.addProfileToUser);
// ? login Function takes {email, password} as params returns JWT
router.post("/login", UserController.login)
// ! MultiPart Function
// ? updates a profile for a user takes {firstName , lastName ,dateOfBirth ,isDeleted,isAdmin , fileName} plus user from jwt
// ? uploads image to uploads folder and pust name in req.body.imageName
// ? returns JWT
router.post("/updateProfile",upload.single('profileImage'), authenticateToken, UserController.UpdateProfile)
// ! Admin only function 
// ? takes user as a params and updates thier profile 'isDeleted' Attribute to true
// ? returns Jwt  
router.post("/deleteUser", authenticateToken, UserController.DeleteUser)
// ! QRcode based 
// ? takes only jwt as params and creates a QrCode from the user object 
// ? returns QrCode of the connected user
// * usage Friend request
router.get("/getQrCode", authenticateToken, UserController.getQrCode)
// ? takes user as params and updates the list of friends of both parties
// ? making them friends on the app  
// ? returns JWt 
router.post("/addFriend", authenticateToken, UserController.addFriend)
// ? takes user as params and updates the list of friends of both parties 
// ? Unfriend feature 
// ? returns JWt 
router.post("/deleteFriend", authenticateToken, UserController.deleteFriend)
module.exports = router;