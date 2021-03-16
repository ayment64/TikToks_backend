
const User = require('../Model/User');
const queryString =require ('query-string');
require('dotenv').config()
const jwt = require('jsonwebtoken')
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

exports.LoginWithFacebook = async function (req, res) {
    const stringifiedParams = queryString.stringify({
        client_id: process.env.FB_APP_ID,
        redirect_uri: 'https://www.google.com/',
        scope: ['email', 'user_friends'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
    });
    
    const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
    console.log(facebookLoginUrl);
    res.json(facebookLoginUrl);
}
