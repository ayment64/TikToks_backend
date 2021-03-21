'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    sharedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
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
    },
    date: {
        type: Date,
        default: Date.now()
    },
})
module.exports = mongoose.model('Share', UserSchema);
