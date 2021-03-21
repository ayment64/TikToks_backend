const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const Share = require('../Model/Share')
const Post = require('../Model/Post')
require('dotenv').config()


exports.share = async function (req, res) {


    try {

        let newPost = new Post(req.body.sharedFrom)
        console.log(newPost )
        let savedpost = await newPost.save()
        const share = new Share(req.body)
        console.log("-----------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------")
        console.log(savedpost )
        share.post = savedpost

        console.log("-----------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------")
        console.log(share)
        console.log("-----------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------")
        console.log("-----------------------------------------------------------------------------------")
        await share.save();
        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        res.json(error)
    }
}