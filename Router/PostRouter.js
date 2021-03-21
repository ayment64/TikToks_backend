//Imports 
const express = require('express');
const PostController = require('../Controller/PostController')
const LikeController = require('../Controller/LikeController')
const CommentController = require('../Controller/CommentController')
const ShareController = require('../Controller/ShareController')
const router = express.Router();
const { authenticateToken } = require('../Core/Jwt');
const { upload } = require('../Core/fileUploader')
// ? test for uploading multiple files
router.post('/post', upload.array('uploadedImages', 10), authenticateToken,PostController.addPost);
router.get('/getMyPost', authenticateToken,PostController.getMyPost);
router.post('/like', authenticateToken,LikeController.like);
router.post('/unlike', authenticateToken,LikeController.unLike);
router.post('/comment', authenticateToken,CommentController.comment);
router.post('/share', authenticateToken,ShareController.share);


module.exports = router;