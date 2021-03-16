
const User = require('../Model/User');
const Profile = require('../Model/Profile');
const queryString = require('query-string');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const { request } = require('express');


exports.add_a_user = async function (req, res) {
    console.log(req.body);
    const user = new User({
        email: req.body.email,

        password: req.body.password,

    });
    try {
        const newUser = await user.save();
        const accessToken = jwt.sign(newUser.toJSON(), process.env.ACCESS_TOKEN_SECRET)

        res.status(201).json({ accessToken })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.login = async function (req, res) {
    console.log(req.body);
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email: email, password: password });
        console.log(user.toJSON());

        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.addProfileToUser = async function (req, res) {
    console.log(req.body);
    console.log(req.user);
    const newProfile = new Profile(req.body)
       
    try {
        const savedProfile = await newPeérofile.save();
        const accessToken = jwt.sign(savedProfile.user.toJSON(), process.env.ACCESS_TOKEN_SECRET)

        res.status(201).json({ accessToken })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.UpdateProfile = async function (req, res) {
    console.log(req.body);

       
    try {
       const updatedUser= await Profile.findOneAndUpdate({user:req.body.user._id},{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        isDeleted: req.body.isDeleted,
        isAdmin: req.body.isAdmin
       })
       console.log(updatedUser.toJSON())
        const accessToken = jwt.sign(updatedUser.user.toJSON(), process.env.ACCESS_TOKEN_SECRET)

        res.status(201).json({ accessToken })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.DeleteUser = async function (req, res) {
    console.log(req.body);

    
       
    try {
     const requestOwner = await Profile.findOne({user:req.body.user})

     if(requestOwner.isAdmin)
     {  const deletedTouser =await User.findOne({_id:req.body.userToDelete})
        console.log("----------------------------------------------------------------------")
        console.log(deletedTouser)
        console.log("----------------------------------------------------------------------")
        const deleteUser = await Profile.findOneAndUpdate({user:deletedTouser},{isDeleted:true});
         console.log(deleteUser)
         res.status(200).json({"message": "User deleted"})
     }else{
         res.status(403).json({"message":'unAuthorised Acceess'})
     }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
exports.getQrCode = async function(req,res){
    var QRCode = require('qrcode')
 var content = req.body.user;
QRCode.toString(JSON.stringify(content),{type:'terminal'}, function (err, url) {
    if(err)
    {
        res.json(400).json({"message": "something went rong"})
    }
  console.log(url)
  res.status(200).json({"url": url})
})
}

// exports.LoginWithFacebook = async function (req, res) {
//     const stringifiedParams = queryString.stringify({
//         client_id: process.env.FB_APP_ID,
//         redirect_uri: 'https://www.google.com/',
//         scope: ['email', 'user_friends'].join(','), // comma seperated string
//         response_type: 'code',
//         auth_type: 'rerequest',
//         display: 'popup',
//     });

//     const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
//     console.log(facebookLoginUrl);
//     res.json(facebookLoginUrl);
// }

