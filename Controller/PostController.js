
const Profile = require('../Model/Profile');
const Post = require('../Model/Post');
require('dotenv').config()


exports.addPost = async function (req, res) {
    try {

        let post = new Post(req.body)
        console.log(post);
        let savedPost = await post.save()
        let updatedUser= await Profile.findOneAndUpdate({user: req.body.user._id},{$addToSet: savedPost},{new : true}).populate( {
            path: "posts"
        })
        res.json(updatedUser)
    } catch (error) {
        res.json(error)
    }
}
exports.getMyPost = async function (req, res) {
    try {
        console.log(req.body)
        let myPosts = await Post.find({ 'user': req.body.user._id, 'isDeleted': false },
            {
                countLikes: { $size: "$likes" },
                countShares: { $size: "$shares" },
                countComments: { $size: "$comments" },
                content: "$content",
                media: "$media"
            })
            .populate([
                {
                    path: "likes", options: {
                        limit: 2,
                        options: {
                            match: {
                                isDeleted: false
                            }
                        }
                    }
                },
                {
                    path: 'comments',
                    options: {
                        limit: 2,
                        match: {
                            isDeleted: false
                        }
                    }

                },
            ])
        res.status(200).json({ myPosts }) //{path: 'profile',populate:{path:'friendlist'}
    } catch (error) {
        res.json(error)
    }

}

exports.getsPostById = async (req, res) => {
    try {
        let post = await Post.findById(req.body.post._id).populate({
            path: "likes", options: {
                limit: 2
            }
        }, {
            path: 'comments',
        })
        res.status(200).json(post)
    } catch (error) {
        res.json(error)
    }
}
exports.deletePost = async (req, res) => {
    try {
        let post = await Post.findByIdAndUpdate(req.body.post._id, { isDeleted: true })
        res.status(200).json(post)
    } catch (error) {
        res.json(error)
    }
}
exports.deleteFileFromPost = async (req, res) => {
    try {
        let post = await Post.findByIdAndUpdate(req.body.post._id, { $unset: { media: req.body.filename } })
        res.status(200).json(post)
    } catch (error) {
        res.json(error)
    }
}
exports.updatePost = async (req, res) => {
    try {
        let post = await Post.findByIdAndUpdate(req.body.post._id, { $set: req.body.post })
        res.status(200).json(post)
    } catch (error) {
        res.json(error)
    }
}