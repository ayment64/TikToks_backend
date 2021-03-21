'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }, date: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('Comment', UserSchema);
