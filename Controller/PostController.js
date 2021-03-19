
const User = require('../Model/User');
const Post = require('../Model/Post');
const jwt = require('jsonwebtoken');
require('dotenv').config()


exports.addPost = async function (req, res) {
    try {

        let post = new Post(req.body)
        let savedPost = await post.save()
        res.json(savedPost)
    } catch (error) {
        res.json(error)
    }
}
exports.getMyPost = async function (req, res) {
    try {
        console.log(req.body)
        let myPosts = await Post.find({ 'user': req.body.user._id }, { countLikes: { $size: "$likes" }, countShares: { $size: "$shares" }, countComments: { $size: "$comments" }, content: "$content", media: "$media" })
            .populate([{
                path: "likes", options: {
                    limit: 2
                }
            }, {
                path: 'comments',
                options: {
                    limit: 2
                }
            }, {
                path: 'share', options: {
                    limit: 2
                }
            },
            ])
        res.status(200).json({ myPosts }) //{path: 'profile',populate:{path:'friendlist'}
    } catch (error) {
        res.json(error)
    }

}
exports.getLikesCountOfMypost = async (req, res) => {
    await Post.find({ _id: req }, { count: { $size: "$frindlist" } })
}