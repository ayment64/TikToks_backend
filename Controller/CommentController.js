const User = require('../Model/User');
const jwt = require('jsonwebtoken');
const Comment = require('../Model/Comment')
const Post = require('../Model/Post')
require('dotenv').config()


exports.comment = async function (req, res) {
    console.log(req.body)
    const comment = new Comment(req.body)
    try {
        let savedComment = await comment.save();
        await Post.findByIdAndUpdate(req.body.post,{$push:{'comments':savedComment}})
        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        res.json(error)
    }
}
exports.deleteComment = async function (req, res) {
    console.log(req.body)

    try {
        await Comment.findByIdAndUpdate(req.body.Comment._id, { isDeleted: true })
        await Post.findByIdAndUpdate(req.body.post,{$unset:{'comments':req.body.Comment._ids}})

        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        res.json(error)
    }
}
exports.updateComment = async function (req, res) {
    console.log(req.body)

    try {
        await Comment.findByIdAndUpdate(req.body.Comment._id, { content: req.body.Comment.content })
        user = new User(req.body.user)
        console.log(user)
        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
        res.status(200).json({ accessToken });

    } catch (error) {
        res.json(error)
    }
}