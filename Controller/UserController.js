
const User = require('../Model/User');
const Profile = require('../Model/Profile');
const jwt = require('jsonwebtoken');
require('dotenv').config()




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
    console.log("-----------------------------------------------------")
    console.log(req.body);
    console.log("-----------------------------------------------------")
    console.log(req.body.user);
    console.log("-----------------------------------------------------")


    req.body.imageName = req.file.filename;
    const newProfile = new Profile(req.body)


    try {
        const savedProfile = await newProfile.save();
        const updatedUser = {
            email: req.body.user.email,
            password: req.body.user.password,
            profile: savedProfile
        }
        const saveduser = await User.findOneAndUpdate({ email: updatedUser.email }, updatedUser
        )
        const accessToken = jwt.sign(savedProfile.user.toJSON(), process.env.ACCESS_TOKEN_SECRET)

        res.status(201).json({ accessToken })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.UpdateProfile = async function (req, res) {
    console.log(req.body);


    try {
        const updatedUser = await Profile.findOneAndUpdate({ user: req.body.user._id }, {
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
        const requestOwner = await Profile.findOne({ user: req.body.user })

        if (requestOwner.isAdmin) {
            const deletedTouser = await User.findOne({ _id: req.body.userToDelete })
            console.log("----------------------------------------------------------------------")
            console.log(deletedTouser)
            console.log("----------------------------------------------------------------------")
            const deleteUser = await Profile.findOneAndUpdate({ user: deletedTouser }, { isDeleted: true });
            console.log(deleteUser)
            res.status(200).json({ "message": "User deleted" })
        } else {
            res.status(403).json({ "message": 'unAuthorised Acceess' })
        }

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

exports.addFriend = async function (req, res) {
    console.log(req.body);
    var currentuser =JSON.stringify(req.body.user);
    try {
        await Profile.findOneAndUpdate({ user: req.body.user }, { $push: { friendlist: req.body.friend } })
        await Profile.findOneAndUpdate({ user: req.body.friend }, { $push: { friendlist: req.body.user } })
        const accessToken = jwt.sign(currentuser, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.deleteFriend = async function (req, res) {
    console.log(req.body);
    var currentuser =JSON.stringify(req.body.user);
    try {
        await Profile.findOneAndUpdate({ user: req.body.user }, { $delete: { friendlist: req.body.friend } })
        await Profile.findOneAndUpdate({ user: req.body.friend }, { $delete: { friendlist: req.body.user } })
        const accessToken = jwt.sign(currentuser, process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
exports.getQrCode = async function (req, res) {
    var QRCode = require('qrcode')
    var content = req.body.user;
    QRCode.toString(JSON.stringify(content), { type: 'terminal' }, function (err, url) {
        if (err) {
            res.json(400).json({ "message": "something went rong" })
        }
        console.log(url)
        res.status(200).json({ "url": url })
    })
}

