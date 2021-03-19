const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const Share = require('../Model/Share')
require('dotenv').config()


exports.share = async function(req,res){
    console.log(req.body)
    const share = new Share(req.body)
    try {
        await share.save();
        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({accessToken});

    } catch (error) {
        res.json(error)
    }
}