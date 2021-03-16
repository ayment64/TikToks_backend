//Imports 
const express = require('express');
const UserController = require('../Controller/UserController');
const router = express.Router();



// ? routes
router.post('/', UserController.add_a_user);
router.get('/facebook', UserController.LoginWithFacebook);

module.exports = router;