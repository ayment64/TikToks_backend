const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const Like = require('../Model/Like')
const Post = require('../Model/Post')
require('dotenv').config()


exports.like = async function (req, res) {
    console.log(req.body)
    const like = new Like(req.body)
    try {
        let savedLike = await like.save();
        await Post.findByIdAndUpdate(req.body.post, { $set: { 'likes': savedLike } })
        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        res.json(error)
    }
}
exports.unLike = async function (req, res) {
    console.log(req.body)

    try {
       await Like.findByIdAndUpdate(req.body.like, { isDeleted: true })
        await Post.findByIdAndUpdate(req.body.post, { $unset: { 'likes': req.body.like } })

        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        res.json(error)
    }
}